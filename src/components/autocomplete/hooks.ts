import { useState, useMemo } from "react";
import { BaseAutocompleteProps } from "./index";

// Note: only when you want to strongly couple a hook with a component or another hook
type UseAutocompleteOptionsArgs<T> = Pick<
  BaseAutocompleteProps<T>,
  "getOptionID" | "isMulti"
>;

export const UseAutocompleteOptions = <T>({
  getOptionID,
  isMulti,
}: UseAutocompleteOptionsArgs<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, T>>({});

  const toggleOption = (option: T) => {
    const id = getOptionID(option);
    setSelectedOptions((lastState) => {
      const isOptionsSelected = lastState[id];
      if (isMulti) {
        if (isOptionsSelected) {
          const copy = { ...lastState };
          delete copy[id];
          return copy;
        }
        return {
          ...lastState,
          [id]: option,
        };
      }
      if (isOptionsSelected) return lastState;
      return {
        [id]: option,
      };
    });
  };

  return {
    selectedOptions,
    toggleOption,
  };
};

// Note: It is OK to repeat the code here, we don't want it to be coupled with the component, but reusable
type UseFiltersArgs<T> = {
  options: Array<T>;
  filterFunction: (option: T, searchTerm: string) => boolean;
};

export const useFilter = <T>({
  options,
  filterFunction,
}: UseFiltersArgs<T>) => {
  const [filter, setFilter] = useState<string>("");

  const filteredOptions = useMemo(() => {
    return options.filter((value: T) => filterFunction(value, filter));
  }, [options, filter, filterFunction]);

  return {
    filter,
    setFilter,
    filteredOptions,
  };
};
