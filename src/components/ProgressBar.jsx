import { useContext } from "react";
import { AppState } from "../App";

const ProgressBar = () => {
  const { activeTechdegree } = useContext(AppState);
  return (
    <div className="h-[3px] w-full mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden duration-200">
      <div
        style={{ backgroundColor: activeTechdegree?.color || "tomato" }}
        className="w-[25%] h-full rounded-full duration-1000"
      ></div>
    </div>
  );
};
export default ProgressBar;
