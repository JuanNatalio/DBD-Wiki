export interface KillerAttributes {
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
}

export interface SurvivorAttributes {
  id: number;
  name: string;
  release_date: string;
  dlc: string;
  map: string;
  perks: string[];
  description: string;
  image: string;
}
