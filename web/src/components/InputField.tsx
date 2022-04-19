import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl>
      <TextField
        {...field}
        {...props}
        id={field.name}
        label={label}
        variant={"outlined"}
        color={"primary"}
      />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </FormControl>
  );
};
