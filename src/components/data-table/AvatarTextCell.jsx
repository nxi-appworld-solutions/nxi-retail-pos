import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const AvatarTextCell = ({ imageSrc, text, linkTo = "#" }) => {
  return (
    <div className="d-flex align-items-center">
      <Link to={linkTo} className="avatar avatar-md me-2">
        <ImageWithBasePath src={imageSrc} alt={text} />
      </Link>

      <span className="fw-medium">{text}</span>
    </div>
  );
};

export default AvatarTextCell;
