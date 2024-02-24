type OptionProps = {
  onClickHandle: () => void;
  isSelected: boolean;
  label: string;
};

export const Option = ({ onClickHandle, isSelected, label }: OptionProps) => {
  return (
    <div
      onClick={onClickHandle}
      className={`${
        isSelected ? "bg-black text-white" : "hover:bg-gray-200"
      } cursor-pointer p-2 rounded-md`}
    >
      {label}
    </div>
  );
};

type SelectedOptionsProps<T> = {
  isMulti: boolean;
  selectedOptions: Record<string, T>;
  getOptionLabel: (option: T) => string;
};

export const SelectedOptions = <T,>({
  isMulti,
  selectedOptions,
  getOptionLabel,
}: SelectedOptionsProps<T>) => {
  const allSelectedOptions = Object.values(selectedOptions);

  if (allSelectedOptions.length === 0) {
    return null;
  }

  if (isMulti) {
    return (
      <span>
        {allSelectedOptions.map((option) => getOptionLabel(option)).join(", ")}
      </span>
    );
  }
  return getOptionLabel(allSelectedOptions[0]);
};
