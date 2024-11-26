import Overlay from "./Overlay";

const ImageOverlay = ({ src, alt, onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <img
        onClick={(e) => e.stopPropagation()}
        className="h-[90vh] max-w-[80%] rounded-2xl"
        src={src}
        alt={alt}
      />
    </Overlay>
  );
};

export default ImageOverlay;
