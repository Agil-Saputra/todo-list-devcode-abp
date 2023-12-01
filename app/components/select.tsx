import React from "react";
// Types
import { Control, Controller, FieldValues } from "react-hook-form";
import { ColourOption, colourOptions } from "@/docs/data";
// Components
import Select, { StylesConfig } from "react-select";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white", padding: ".35rem 0",  }),
  option: (styles, { data }) => {
    return {
      ...styles,
      ...dot(data.color),
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

interface SelectProps {
  control: Control<FieldValues, any>;
  defaultValue?: ColourOption;
}

const SelectComponent = ({ control, defaultValue }: SelectProps) => {
  return (
    <Controller
      name="priority"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          defaultValue={defaultValue ? defaultValue : colourOptions[0]}
          options={colourOptions}
          styles={colourStyles}
          className="w-[210px]"
        />
      )}
      rules={{ required: true }}
    />
  );
};

export default SelectComponent;
