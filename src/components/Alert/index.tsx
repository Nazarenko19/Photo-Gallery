import React, { FC } from "react";
import ReactDOM from "react-dom";

// import Button from "components/Button";

interface AlertProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  deleting: boolean;
}

const Alert: FC<AlertProps> = ({ onClose, onSubmit, title, deleting }) => {
  return <div>alert</div>;
};

export default Alert;
