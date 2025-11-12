# Auth0 Implementation Guide - DBD Wiki

## Overview

This document explains the complete Auth0 authentication system with user favorites functionality. Since you're using this as a learning opportunity, I'll cover **WHAT** was changed, **WHY** it was changed, and **HOW** it works.

---

## 1. User Model Changes

### File: `backend/src/models/usersModel.ts`

### WHAT Changed:

```typescript
// BEFORE (incorrect - singular ObjectId):
favoriteKillers: {
  type: Schema.Types.ObjectId,
  ref: "Killer"
}

// AFTER (correct - array of numbers):
favoriteKillers: {
  type: [Number],
  default: []
}
```

### WHY Changed:

1. **Multiple Favorites**: Users can favorite multiple killers/survivors, so we need an **array** not a single value
2. **Numeric IDs**: Your killers and survivors use numeric game IDs (1, 2, 3...), not MongoDB ObjectIds
3. **Simplicity**: Storing numeric IDs is simpler than managing ObjectId references
4. **API Alignment**: Your routes use `/api/killers/:id` where `:id` is a number, so storing numbers makes the favorites system consistent

### HOW It Works:

- MongoDB stores an array like: `favoriteKillers: [1, 5, 23]`
- Each number represents a killer's game ID (not database \_id)
- When you want full killer details, you query: `Killer.find({ id: { $in: [1, 5, 23] } })`
- The `$in` operator matches any killer whose `id` field is in the array

---

## 2. User Routes - Complete Auth System

### File: `backend/src/routes/userRoutes.ts`

### Added Imports:

```typescript
import Killer from "../models/killersModel";
import Survivor from "../models/survivorsModel";
```

**WHY**: Need these models to validate that killers/survivors exist before adding to favorites

---

### Route 1: `POST /api/users/upload`

**PURPOSE**: Sync user from Auth0 to MongoDB (auto-creates account on first login)

**HOW IT WORKS**:

1. User logs in on frontend → Auth0 generates JWT token
2. Frontend calls this endpoint with token in `Authorization: Bearer <token>` header
3. `checkJwt` middleware validates token (signature, audience, issuer)
4. Extract user data from JWT claims:
   - `sub` (subject) = Auth0's unique user ID (e.g., "auth0|123456")
   - `email`, `name`, `picture` = user profile info from Auth0
5. Use `findOneAndUpdate` with `upsert: true`:
   - If user exists → update email/name/picture (in case they changed in Auth0)
   - If user doesn't exist → create new user document
6. Return the user document to frontend

**KEY CONCEPTS**:

- **JWT Claims**: Data encoded in the token (Auth0 puts user info here)
- **Upsert**: "Update if exists, insert if not" - prevents duplicate accounts
- **Idempotent**: Calling this endpoint multiple times has the same result (safe to call on every login)

---

### Route 2: `GET /api/users/me`

**PURPOSE**: Get current user's profile data from MongoDB

**HOW IT WORKS**:

1. Extract `auth0Id` from validated JWT token
2. Query MongoDB: `User.findOne({ auth0Id })`
3. Return user document (includes favorites arrays)

**WHY SEPARATE FROM /upload**:

- `/upload` is for syncing Auth0 → MongoDB (write operation)
- `/me` is for reading user data (read operation)
- Following REST principles: different operations = different endpoints

**ORIGINAL BUG**:

```typescript
// WRONG - /me was INSIDE /upload's try-catch:
userRouter.post("/upload", checkJwt, async (req, res) => {
  try {
    // ... upload logic ...
  } catch (err) { ... }

  userRouter.get("/me", checkJwt, async (req, res) => {  // ❌ NESTED!
    // ... me logic ...
  });
});
```

**WHY THIS WAS BROKEN**:

- The `GET /me` route was defined INSIDE the POST handler's scope
- It would never be registered with Express
- Even if it registered, it would only run AFTER the POST completed (weird!)

**CORRECT STRUCTURE**:

```typescript
// Two sibling routes:
userRouter.post("/upload", checkJwt, async (req, res) => { ... });
userRouter.get("/me", checkJwt, async (req, res) => { ... });
```

---

### Route 3: `GET /api/users/favorites`

**PURPOSE**: Get full details of all favorite killers/survivors

**HOW IT WORKS**:

1. Get current user from MongoDB (has `favoriteKillers: [1, 5, 23]`)
2. Query killers: `Killer.find({ id: { $in: user.favoriteKillers } })`
   - `$in` operator: "find all documents where `id` is in this array"
3. Query survivors: `Survivor.find({ id: { $in: user.favoriteSurvivors } })`
4. Return both arrays with FULL documents (name, image, perks, etc.)

**WHY SEPARATE ENDPOINT**:

- `/me` returns user data with just the numeric ID arrays: `favoriteKillers: [1, 5, 23]`
- `/favorites` returns populated data with full killer/survivor objects
- This separation lets you choose: lightweight (just IDs) vs. detailed (full objects)

**EXAMPLE RESPONSE**:

```json
{
  "favoriteKillers": [
    { "id": 1, "name": "The Trapper", "image": "...", "perks": [...], ... },
    { "id": 5, "name": "The Nurse", "image": "...", "perks": [...], ... }
  ],
  "favoriteSurvivors": [
    { "id": 1, "name": "Dwight Fairfield", "image": "...", "perks": [...], ... }
  ]
}
```

---

### Route 4: `POST /api/users/favorites/killers/:id`

**PURPOSE**: Add a killer to user's favorites

**HOW IT WORKS**:

```typescript
const killerId = Number(req.params.id); // Convert URL param to number

// 1. Validate killer exists
const killer = await Killer.findOne({ id: killerId });
if (!killer) return res.status(404).json({ error: "Killer not found" });

// 2. Add to favorites array
const user = await User.findOneAndUpdate(
  { auth0Id }, // Filter: find this user
  { $addToSet: { favoriteKillers: killerId } }, // Update: add ID to array
  { new: true } // Return updated document
);
```

**KEY MONGODB OPERATOR - `$addToSet`**:

- **What it does**: Adds value to array ONLY if it doesn't already exist
- **Why use it**: Prevents duplicates automatically (no need to check first)
- **Example**:

  ```javascript
  // User has: favoriteKillers: [1, 5]
  // Add killer 23: $addToSet: { favoriteKillers: 23 }
  // Result: favoriteKillers: [1, 5, 23]

  // Try to add 5 again: $addToSet: { favoriteKillers: 5 }
  // Result: favoriteKillers: [1, 5, 23]  (no change - already exists)
  ```

**WHY VALIDATE FIRST**:

- If user tries to favorite killer ID 999 (doesn't exist), we return 404 immediately
- Prevents favorites array from having invalid IDs
- Better user experience: "Killer not found" is clearer than silent success

---

### Route 5: `DELETE /api/users/favorites/killers/:id`

**PURPOSE**: Remove a killer from user's favorites

**HOW IT WORKS**:

```typescript
const user = await User.findOneAndUpdate(
  { auth0Id },
  { $pull: { favoriteKillers: killerId } }, // Remove all instances of this ID
  { new: true }
);
```

**KEY MONGODB OPERATOR - `$pull`**:

- **What it does**: Removes all instances of a value from an array
- **Example**:
  ```javascript
  // User has: favoriteKillers: [1, 5, 23, 5]  (somehow 5 was added twice)
  // Remove killer 5: $pull: { favoriteKillers: 5 }
  // Result: favoriteKillers: [1, 23]  (removes ALL instances)
  ```

**WHY NO VALIDATION**:

- It's okay if the killer doesn't exist in favorites (idempotent operation)
- Removing something that's not there = no error, just return updated array
- Frontend can check: if array length didn't change, it wasn't favorited

---

### Routes 6 & 7: Survivor Favorites

**`POST /api/users/favorites/survivors/:id`** and **`DELETE /api/users/favorites/survivors/:id`**

**WHAT**: Exact same logic as killer routes, but for survivors

**WHY SEPARATE ROUTES**:

- RESTful design: each resource type (killers, survivors) has its own endpoint
- Clear API: `/favorites/killers/5` vs. `/favorites/survivors/5` is explicit
- Easier to add features later (e.g., different logic for killers vs. survivors)

---

## 3. JWT Authentication Flow

### How Auth0 Tokens Work:

```
1. User clicks "Login" button
   ↓
2. Auth0 login page opens (hosted by Auth0, not your app)
   ↓
3. User enters credentials
   ↓
4. Auth0 validates credentials
   ↓
5. Auth0 redirects back to your app with authorization code
   ↓
6. Your app exchanges code for JWT access token
   ↓
7. Your app stores token (usually in memory via Auth0 SDK)
   ↓
8. For every API call, include: Authorization: Bearer <token>
   ↓
9. Backend validates token with checkJwt middleware
   ↓
10. If valid, backend processes request
```

### What's in a JWT Token?

A JWT has 3 parts (separated by dots):

```
eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoMHwxMjM0NTYifQ.signature
      HEADER             PAYLOAD (Claims)        SIGNATURE
```

**Header**: Algorithm used (RS256 = RSA with SHA-256)
**Payload**: User data (claims) like `sub`, `email`, `name`, `aud` (audience), `iss` (issuer)
**Signature**: Cryptographic signature that proves the token wasn't tampered with

### The `checkJwt` Middleware:

```typescript
const checkJwt = auth({
  audience: config.auth0_audience, // Your API identifier (e.g., "https://dbd-api")
  issuerBaseURL: config.auth0_domain_name, // Auth0 tenant (e.g., "https://dev-xyz.us.auth0.com")
  tokenSigningAlg: "RS256", // Signature algorithm
});
```

**WHAT IT VALIDATES**:

1. **Signature**: Was this token really issued by Auth0? (prevents forgery)
2. **Audience**: Is this token meant for YOUR API? (prevents token reuse)
3. **Issuer**: Did it come from YOUR Auth0 tenant? (prevents wrong-tenant tokens)
4. **Expiration**: Is the token still valid? (tokens expire, usually 24 hours)

**IF VALIDATION PASSES**:

- Request continues to your route handler
- Token claims available in `req.auth.payload`

**IF VALIDATION FAILS**:

- Middleware returns 401 Unauthorized automatically
- Your route handler never runs

---

## 4. Frontend Integration (Profile.tsx Skeleton)

### File: `frontend/src/pages/Profile.tsx`

### WHY A SKELETON WITH COMMENTS?

You said you want to learn, so I provided:

1. **Imports**: What you need from Auth0 SDK and React
2. **Interface**: TypeScript definition for your User model
3. **TODO Comments**: Step-by-step instructions for implementation
4. **Example Code**: A complete example at the bottom showing the pattern

### HOW TO IMPLEMENT IT:

**Step 1: Get Auth0 Data**

```typescript
const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
```

- `user`: Auth0 user object (name, email, picture from Auth0)
- `isAuthenticated`: Boolean - is user logged in?
- `isLoading`: Boolean - is Auth0 still checking?
- `getAccessTokenSilently`: Function to get JWT token

**Step 2: Create State**

```typescript
const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**Step 3: Fetch Data on Mount**

```typescript
useEffect(() => {
  if (!isAuthenticated) return; // Don't fetch if not logged in

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Get JWT token
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: config.auth0_audience },
      });

      // Call your API
      const res = await fetch("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setUserProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [isAuthenticated, getAccessTokenSilently]);
```

**Step 4: Conditional Rendering**

```typescript
if (isLoading) return <div>Loading authentication...</div>;
if (!isAuthenticated) return <div>Please log in</div>;
if (loading) return <div>Loading profile...</div>;
if (error) return <div>Error: {error}</div>;
if (!userProfile) return <div>No profile data</div>;

// Success - show profile
return <div>Welcome, {userProfile.name}!</div>;
```

---

## 5. Testing the API

### Test Sequence (use a tool like Postman or curl):

**1. Login on Frontend**

```
Visit http://localhost:5173
Click "Login" button
Login with Auth0
```

**2. Get Your Access Token**

In your browser console:

```javascript
// If using Auth0 React SDK
const token = await getAccessTokenSilently({
  authorizationParams: { audience: "YOUR_AUTH0_AUDIENCE" },
});
console.log(token);
```

Or check the Network tab in DevTools for the `Authorization` header in API requests.

**3. Sync User to Database**

```bash
# PowerShell syntax:
$token = "eyJhbGciOiJSUzI1Ni..."  # Your actual token

Invoke-WebRequest -Uri "http://localhost:8080/api/users/upload" `
  -Method POST `
  -Headers @{ Authorization = "Bearer $token" }
```

**4. Get Your Profile**

```bash
Invoke-WebRequest -Uri "http://localhost:8080/api/users/me" `
  -Method GET `
  -Headers @{ Authorization = "Bearer $token" }
```

**5. Add Killer to Favorites**

```bash
# Add The Trapper (id: 1)
Invoke-WebRequest -Uri "http://localhost:8080/api/users/favorites/killers/1" `
  -Method POST `
  -Headers @{ Authorization = "Bearer $token" }
```

**6. Get Favorites**

```bash
Invoke-WebRequest -Uri "http://localhost:8080/api/users/favorites" `
  -Method GET `
  -Headers @{ Authorization = "Bearer $token" }
```

**7. Remove Killer from Favorites**

```bash
Invoke-WebRequest -Uri "http://localhost:8080/api/users/favorites/killers/1" `
  -Method DELETE `
  -Headers @{ Authorization = "Bearer $token" }
```

---

## 6. Environment Variables Checklist

### Backend (.env):

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbd-wiki
AUTH0_DOMAIN_NAME=https://dev-xyz.us.auth0.com
AUTH0_AUDIENCE=https://dbd-api  # Your API identifier from Auth0
PORT=8080
```

### Frontend (.env):

```env
VITE_AUTH0_DOMAIN_NAME=dev-xyz.us.auth0.com  # Without https://
VITE_AUTH0_CLIENTID=abc123xyz  # From Auth0 Application settings
VITE_AUTH0_AUDIENCE=https://dbd-api  # Same as backend
```

---

## 7. Common Issues & Solutions

### Issue 1: "401 Unauthorized" on API calls

**CAUSE**: Token validation failed

**DEBUG STEPS**:

1. Check token is included: `Authorization: Bearer <token>`
2. Verify `AUTH0_AUDIENCE` matches in backend .env and frontend .env
3. Verify `AUTH0_DOMAIN_NAME` matches your Auth0 tenant
4. Check token expiration (try getting a fresh token)
5. Ensure Auth0 API is configured with RS256 signing algorithm

---

### Issue 2: User not found (404)

**CAUSE**: User not in MongoDB yet

**SOLUTION**: Call `/api/users/upload` first (this creates the user)

**TIP**: In a real app, call `/upload` automatically after login:

```typescript
useEffect(() => {
  if (isAuthenticated) {
    syncUserToDb(); // Calls /upload endpoint
  }
}, [isAuthenticated]);
```

---

### Issue 3: Favorites not updating

**CAUSE**: Might be adding/removing wrong ID or killer/survivor doesn't exist

**DEBUG**:

1. Check response from POST/DELETE - does it show updated array?
2. Verify killer/survivor exists: GET `/api/killers/:id`
3. Check MongoDB directly: `db.users.findOne({ auth0Id: "..." })`

---

## 8. Key Learning Concepts

### RESTful API Design:

- **GET** = Read data (idempotent, no side effects)
- **POST** = Create/Add data
- **DELETE** = Remove data
- **Resource-based URLs**: `/favorites/killers/1` (noun, not verb like `/addFavorite`)

### MongoDB Array Operations:

- **`$addToSet`**: Add to array if not exists (prevents duplicates)
- **`$pull`**: Remove from array
- **`$in`**: Match any value in array (`{ id: { $in: [1, 5, 23] } }`)

### Auth0 JWT Flow:

- **Token = Proof of Identity**: Like a driver's license for APIs
- **Claims = Info About User**: Encoded in token (sub, email, name)
- **Signature = Prevents Forgery**: Only Auth0 can sign valid tokens
- **Middleware = Bouncer**: Checks token before letting request through

### React Patterns:

- **useAuth0**: Hook for Auth0 integration (login, logout, get token)
- **useEffect with async**: Fetch data when component mounts
- **Conditional Rendering**: Show loading/error/success states
- **Token in Headers**: `Authorization: Bearer <token>` for protected routes

---

## 9. Next Steps for Learning

### Frontend Implementation:

1. Complete `Profile.tsx` using the TODO comments as a guide
2. Create a `Favorites.tsx` page to display full lists
3. Add favorite buttons to killer/survivor list/detail pages
4. Handle optimistic updates (update UI before API confirms)

### Advanced Features:

1. Add pagination to favorites list
2. Implement search/filter on favorites
3. Add "Recently Added" section (sort by timestamps)
4. Export favorites to JSON/CSV

### Backend Improvements:

1. Add rate limiting to prevent abuse
2. Add input validation with Joi or Zod
3. Add logging (Winston, Morgan)
4. Add tests (Jest, Supertest)

---

## Summary

You now have a complete Auth0 authentication system with user favorites! 🎉

**What you got**:

- ✅ User auto-creation on first login
- ✅ JWT token validation on all user routes
- ✅ RESTful endpoints for managing favorites
- ✅ MongoDB array operations for efficient favorites storage
- ✅ Comprehensive documentation for learning

**Your task**:

- Implement `Profile.tsx` using the skeleton and example code
- Test the API with your Auth0 credentials
- Add favorite buttons to your killer/survivor pages

Good luck with your learning journey! 🚀
