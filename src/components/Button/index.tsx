import React, { FC, ButtonHTMLAttributes } from "react";
import { withStyles } from "@material-ui/core";
import buttonStyles from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ onClick, text, type, disabled, className }) => {
  return <div>button</div>;
};

export default withStyles(buttonStyles)(Button);
