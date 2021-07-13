import React, { FC, ButtonHTMLAttributes } from "react";
import { Button as BasicButton } from "@material-ui/core";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ onClick, text, disabled, className }) => {
  return (
    <BasicButton className={className} disabled={disabled} onClick={onClick}>
      {text}
    </BasicButton>
  );
};

export default Button;
