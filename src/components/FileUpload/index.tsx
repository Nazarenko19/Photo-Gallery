import React, { FC, useRef, FormEvent } from "react";
import { withStyles } from "@material-ui/core";
import fileUploadStyles from "./styles";
import Button from "components/Button";

interface FileUploadProps {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const pickImageButtonClickHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className="file-upload">
      <input type="file" name="files" onChange={onChange} className="is-hidden" multiple ref={fileInput} />
      <Button text="Pick images" onClick={pickImageButtonClickHandler} type="button" className="is-link" />
    </div>
  );
};

export default withStyles(fileUploadStyles)(FileUpload);
