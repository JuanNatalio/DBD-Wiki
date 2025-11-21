import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "./config.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./transitions.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={config.auth0_domain_name}
      clientId={config.auth0_clientID}
      authorizationParams={{
        redirect_uri: globalThis.location.origin,
        audience: config.auth0_audience,
        scope: "openid profile email",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </QueryClientProvider>
);
