import React, { FC } from "react";
import { withStyles } from "@material-ui/core";
import messageStyles from "./styles";

interface MessageProps {
  msg: string;
  type: "danger" | "success" | "info";
}

const Message: FC<MessageProps> = ({ msg, type }) => {
  return <div>message</div>;
};

export default withStyles(messageStyles)(Message);
