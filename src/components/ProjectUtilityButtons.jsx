import { useContext } from "react";
import { AppState } from "../App";

const ProjectUtilityButtons = () => {
  const { excludeExceeds, setExcludeExceeds, activeTechdegree } =
    useContext(AppState);

  return (
    <div className="px-5 py-8 flex items-center gap-2">
      <div className="flex items-center gap-5 ml-5 py-3 cursor-pointer">
        <input
          id="excludeExceeds"
          type="checkbox"
          onChange={() => {
            setExcludeExceeds(!excludeExceeds);
          }}
          className={`toggle-switch bg-zinc-200 dark:bg-zinc-400 checked:bg-emerald-500 cursor-pointer`}
          Exclude
          Exceeds
        />
        <label htmlFor="excludeExceeds" className="cursor-pointer">
          Exclude Exceeds
        </label>
      </div>
    </div>
  );
};
export default ProjectUtilityButtons;
