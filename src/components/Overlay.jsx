const Overlay = ({ onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className="absolute h-screen w-full overflow-hidden bg-zinc-950 top-0 left-0 z-30 bg-opacity-70 grid place-items-center"
    >
      <div className="h-full w-full relative grid place-items-center">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
