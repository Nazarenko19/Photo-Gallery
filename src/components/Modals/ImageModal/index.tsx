import React, { FC } from "react";

interface ImageModalProps {
  onClose: () => void;
  url: string;
}

const ImageModal: FC<ImageModalProps> = ({ onClose, url }) => {
  return (
    <div className="modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content modal-content--image">
        <img src={url} alt="" />
      </div>
      <button className="modal-close is-large" onClick={onClose}></button>
    </div>
  );
};

export default ImageModal;
