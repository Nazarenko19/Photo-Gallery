import React, { FC, MouseEvent } from "react";
import { withStyles } from "@material-ui/core";
import cardStyles from "./styles";

interface CardProps {
  onDelete: (e: MouseEvent<HTMLAnchorElement>) => void;
  onImageClick: () => void;
  imageUrl: string;
  publicCard?: boolean;
  uploader?: string;
}

const Card: FC<CardProps> = ({ onDelete, onImageClick, imageUrl, publicCard, uploader }) => {
  return <div>card</div>;
};

export default withStyles(cardStyles)(Card);
