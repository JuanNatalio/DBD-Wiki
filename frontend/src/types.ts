export type User = {
  _id: string;
  auth0Id: string;
  email?: string;
  name?: string;
  picture?: string;
  favoritesKillers?: Killer[];
  favoritesSurvivors?: Survivor[];
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
