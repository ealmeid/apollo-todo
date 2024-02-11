import React from "react";
import { useSelect } from "./useSelect";

interface SelectProps<T> {
  options: T[];
  defaultSelected?: T[];
  type?: "single" | "multi";
  onSelect?: (currentlySelected: T[]) => any;
  renderOption: (
    option: T,
    isSelected: boolean,
    onSelect: (option: T) => any
  ) => React.ReactNode;
}

export const SelectOptions = <T,>({
  type = "single",
  options = [],
  defaultSelected = [],
  renderOption,
}: SelectProps<T>) => {
  const { selected, onSelect } = useSelect<T>({ type, defaultSelected });

  return options.map((option) =>
    renderOption(option, selected.includes(option), () => onSelect(option))
  );
};
