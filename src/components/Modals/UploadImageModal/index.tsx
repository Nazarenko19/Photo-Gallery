import React, { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "store/modules/gallery/actions";
import { RootState } from "store";

import Button from "components/Button";
import Modal from "../BasicModal";
import FileUpload from "components/FileUpload";

interface UploadImagesModalProps {
  onClose: () => void;
}

interface Image {
  name: string;
  progress: number;
}

const UploadImagesModal: FC<UploadImagesModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState<FileList | null>();
  const [filesArr, setFilesArr] = useState<Image[]>([]);
  const [disabled, setDisabled] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setDisabled(false);
      let images: Image[] = [];
      Array.from(e.currentTarget.files).forEach(file => images.push({ name: file.name, progress: 0 }));
      setFilesArr(images);
    } else {
      setFilesArr([]);
      setDisabled(true);
    }
    setFiles(e.currentTarget.files);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (files && files.length > 0 && user) {
      dispatch(
        addImage(files, user, (progress, file) => {
          const copyOfFilesArr = [...filesArr];
          const findFile = copyOfFilesArr.find(f => f.name === file.name);
          if (findFile) {
            findFile.progress = Math.floor(progress);
          }
          const updatedArr = copyOfFilesArr.map(f => (f.name === file.name ? (findFile ? findFile : f) : f));
          setFilesArr(updatedArr);
        })
      );
      setFiles(null);
      setDisabled(true);
    }
  };

  return (
    <Modal onClose={onClose} title="Upload images">
      <form>
        <FileUpload onChange={changeHandler} />
        {filesArr.length > 0 && (
          <ul>
            {filesArr.map((file: Image, index) => (
              <li key={index}>
                <p>
                  {file.name}
                  {file.progress === 100 && <span>UPLOADED</span>}
                </p>
                <progress value={file.progress} max="100">
                  {file.progress}%
                </progress>
              </li>
            ))}
          </ul>
        )}
        <Button text="Upload" disabled={disabled} onClick={submitHandler} />
      </form>
    </Modal>
  );
};

export default UploadImagesModal;
