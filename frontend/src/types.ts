export type User = {
  auth0Id: string;
  name?: string;
  email?: string;
  picture?: string;
  favoriteKillers: number[];
  favoriteSurvivors: number[];
  createdAt: string;
  updatedAt: string;
};

export type Killer = {
  id: number;
  name: string;
  real_name: string;
  release_date: string;
  dlc: string;
  map: string;
  image: string;
  power: {
    name: string;
    description: string;
  };
  perks: string[];
  description: string;
  terror_radius: string;
  base_movement_speed: string;
};

export type Survivor = {
  id: number;
  name: string;
  release_date: string;
  dlc: string;
  map: string;
  perks: string[];
  description: string;
  image: string;
};

export type FilterValues = "earliest" | "most-recent";

export type Email = {
  subject: string;
  text: string;
  userEmail: string;
};

export type submittingStatus = "success" | "idle" | "error";
