import React, { FC, ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <div>
      <div onClick={onClose}></div>
      <div>
        <header>
          <p>{title}</p>
          <button onClick={onClose}></button>
        </header>
        <section>{children}</section>
        <footer>
          <button onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
