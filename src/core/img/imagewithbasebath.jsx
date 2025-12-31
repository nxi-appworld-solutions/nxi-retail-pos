import React from "react";
import { image_path } from "../../environment";
const defaultAvatar = "/assets/img/avatar/avatar-1.jpg";

interface Image {
  className?: string;
  src?: string; // Make it optional, since fallback is used
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
}

const ImageWithBasePath = (props: Image) => {
  const altText = props.alt || "image";

  // Use image_path if needed, or fallback to defaultAvatar
  // const fullSrc = props.src ? `${image_path}${props.src}` : defaultAvatar;
  const fullSrc = props.src ? props?.src : defaultAvatar;

  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={altText}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;
