import React, { FC, InputHTMLAttributes } from "react";
import { withStyles, TextField } from "@material-ui/core";
import inputStyles from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ type = "text", placeholder, value, name, onChange, label, multiple }) => {
  return <TextField label={label} value={value} name={name} onChange={onChange} placeholder={placeholder} />;
};

export default withStyles(inputStyles)(Input);
