import { useEffect } from "react";
import { useFilter, UseAutocompleteOptions } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Option, SelectedOptions } from "./components";

export type BaseAutocompleteProps<T> = {
  // the options that are available for choosing, for the best DX, allow array of any type
  options: Array<T>;
  // is multi select or single value select
  isMulti: boolean;
  // a function to call when we want to generate a label from an option
  getOptionLabel: (option: T) => string;
  // a function to call when we want to generate an id (string) from an option
  getOptionID: (option: T) => string;
  // a function that receives an option and the search term and returns true if the option matches the search and false otherwise
  filterFunction: (option: T, searchTerm: string) => boolean;
};

export type MultiOrSingular<T> =
  // if is multi is true the on change will receive an array of selected options
  | { isMulti: true; onChange: (value: Array<T>) => void }
  // if is multi is false the on change will receive a single value
  | { isMulti: false; onChange: (value: T) => void };

type AutocompleteProps<T> = BaseAutocompleteProps<T> & MultiOrSingular<T>;

export const Autocomplete = <T,>({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
  getOptionLabel,
}: AutocompleteProps<T>) => {
  const { selectedOptions, toggleOption } = UseAutocompleteOptions({
    isMulti,
    getOptionID,
  });

  // On options state change trigger onChange appropriately
  useEffect(() => {
    const allSelectedOptions = Object.values(selectedOptions);

    if (isMulti) {
      const allOptions = allSelectedOptions;
      onChange(allOptions);
      return;
    }

    const singleOption = allSelectedOptions[0];
    onChange(singleOption);
  }, [selectedOptions, isMulti, onChange]);

  const { filter, setFilter, filteredOptions } = useFilter({
    options,
    filterFunction,
  });

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <SelectedOptions
        selectedOptions={selectedOptions}
        isMulti={isMulti}
        getOptionLabel={getOptionLabel}
      />
      <Popover>
        <PopoverTrigger autoFocus className="w-2/5">
          <Input
            autoComplete="off"
            className="min-w-full"
            placeholder="Search"
            type="text"
            name="search"
            autoFocus
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          align="center"
          sideOffset={5}
          className="max-h-[300px] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <Option
                  key={getOptionID(option)}
                  onClickHandle={() => toggleOption(option)}
                  isSelected={Boolean(selectedOptions[getOptionID(option)])}
                  label={getOptionLabel(option)}
                />
              ))
            ) : (
              <div>No results</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
