import React, { FC, useRef, FormEvent } from "react";
import { withStyles } from "@material-ui/core";
import fileUploadStyles from "./styles";

interface FileUploadProps {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
  return <div>FileUpload</div>;
};

export default withStyles(fileUploadStyles)(FileUpload);
