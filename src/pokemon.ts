export type Pokemon = {
  isLegendary?: boolean;
  name: string;
  pokedexEntryNumber: number;
  type: PokemonType;
};

// https://www.youtube.com/watch?v=B2E_fJvBB1I
export const PokemonTypes = {
  Fire: "fire",
  Water: "water",
  Grass: "grass",
  Electric: "electric",
  Psychic: "psychic",
  Dragon: "dragon",
  Ice: "ice",
  Fairy: "fairy",
  Ghost: "ghost",
  Steel: "steel",
} as const;

export type PokemonType = (typeof PokemonTypes)[keyof typeof PokemonTypes];

export const pokemons: Array<Pokemon> = [
  {
    type: PokemonTypes.Fire,
    name: "Charmander",
    pokedexEntryNumber: 4,
  },
  {
    type: PokemonTypes.Water,
    name: "Squirtle",
    pokedexEntryNumber: 7,
  },
  {
    type: PokemonTypes.Grass,
    name: "Bulbasaur",
    pokedexEntryNumber: 1,
  },
  {
    type: PokemonTypes.Electric,
    isLegendary: false,
    name: "Pikachu",
    pokedexEntryNumber: 25,
  },
  {
    type: PokemonTypes.Psychic,
    isLegendary: true,
    name: "Mewtwo",
    pokedexEntryNumber: 150,
  },
  {
    type: PokemonTypes.Dragon,
    isLegendary: true,
    name: "Rayquaza",
    pokedexEntryNumber: 384,
  },
  {
    type: PokemonTypes.Ice,
    name: "Glaceon",
    pokedexEntryNumber: 471,
  },
  {
    type: PokemonTypes.Fairy,
    isLegendary: false,
    name: "Sylveon",
    pokedexEntryNumber: 700,
  },
  {
    type: PokemonTypes.Ghost,
    isLegendary: false,
    name: "Gengar",
    pokedexEntryNumber: 94,
  },
  {
    type: PokemonTypes.Steel,
    isLegendary: true,
    name: "Dialga",
    pokedexEntryNumber: 483,
  },
];
