import { useContext } from "react";
import { AppState } from "../App";

const ProgressBar = () => {
  const { activeTechdegree, allQuestions, answeredCount, activeProject } =
    useContext(AppState);

  const width =
    answeredCount === 0
      ? 0
      : (answeredCount / allQuestions.current.length) * 100;

  return (
    <div className="h-[3px] w-full mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden duration-200">
      <div
        style={{

          backgroundColor:
            activeTechdegree?.color || activeProject.techdegree.color,
          width: `${width}%`,
        }}
        className="h-full rounded-full duration-1000"
      ></div>
    </div>
  );
};
export default ProgressBar;
