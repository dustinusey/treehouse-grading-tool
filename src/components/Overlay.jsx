import { useContext } from "react";
import { AppState } from "../App";

const Overlay = () => {
  const { currentMockup, setActiveOverlay } = useContext(AppState);
  return (
    <div
      onClick={() => setActiveOverlay(false)}
      className="absolute h-screen w-full overflow-hidden bg-zinc-950 top-0 left-0 z-30 bg-opacity-70 grid place-items-center"
    >
      <div className="h-full w-full relative grid place-items-center">
        <img
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-[90vh] max-w-[80%] rounded-2xl"
          src={currentMockup}
        />
      </div>
    </div>
  );
};
export default Overlay;
