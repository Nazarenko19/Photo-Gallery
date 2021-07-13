import React, { FC, Fragment } from "react";
import { Alert as BasicAlert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
interface AlertProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  deleting: boolean;
}

const Alert: FC<AlertProps> = ({ onClose, onSubmit, title, deleting }) => {
  return (
    <BasicAlert
      action={
        <Fragment>
          <Button color="inherit" size="small" onClick={onClose}>
            CANCEL
          </Button>
          <Button color="inherit" size="small" onClick={onSubmit}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Fragment>
      }
    >
      {title}
    </BasicAlert>
  );
};

export default Alert;
