import React, { FC } from "react";
import { withStyles } from "@material-ui/core";
import loaderStyles from "./styles";

const Loader: FC = () => {
  return <div>loading...</div>;
};

export default withStyles(loaderStyles)(Loader);
