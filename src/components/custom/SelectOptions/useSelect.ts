import { useState } from "react";
import { xor } from "lodash";

export const useSelect = <T>({
  type,
  defaultSelected = [],
}: {
  type: "single" | "multi";
  defaultSelected: T[];
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  const onSelect = (option: T) => {
    if (type === "single") {
      setSelected([option]);
    } else {
      setSelected(xor([...selected], [option]));
    }
  };

  return { selected, onSelect };
};
