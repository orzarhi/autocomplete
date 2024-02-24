import "./App.css";
import { Autocomplete } from "./components/autocomplete";
import { Pokemon, pokemons } from "./pokemon";

const isStringContainsSearchTerm = (string: string, searchTerm: string) =>
  string.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

const getPokemonOptionLabel = (pokemon: Pokemon) => pokemon.name;

const getPokemonOptionID = (pokemon: Pokemon) =>
  pokemon.pokedexEntryNumber.toString();

const pokemonFilterFunction = (pokemon: Pokemon, searchTerm: string) =>
  isStringContainsSearchTerm(pokemon.name, searchTerm);

const onPokemonsSelected = (pokemon: Pokemon[] | Pokemon) => {
  console.log(pokemon);
};

function App() {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4">
      <h1>My Awesome Pokemon Selector</h1>
      <Autocomplete
        options={pokemons}
        getOptionLabel={getPokemonOptionLabel}
        getOptionID={getPokemonOptionID}
        filterFunction={pokemonFilterFunction}
        isMulti={true}
        onChange={onPokemonsSelected}
      />
    </div>
  );
}

export default App;
