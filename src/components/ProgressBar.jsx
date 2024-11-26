import { useContext } from "react";
import { AppState } from "../App";

const ProgressBar = () => {
  const { activeTechdegree, activeProject, gradedRequirements } = useContext(AppState);

  const getTotalRequirements = () => {
    if (!activeProject?.gradingSections) return 0;
    return activeProject.gradingSections.reduce((total, section) => {
      return total + section.requirements.length;
    }, 0);
  };

  const width =
    gradedRequirements.length === 0
      ? 0
      : (gradedRequirements.length / getTotalRequirements()) * 100;

  return (
    <div className="h-[3px] w-full mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden duration-200">
      <div
        style={{
          backgroundColor: activeTechdegree?.color,
          width: `${width}%`,
        }}
        className="h-full rounded-full duration-1000"
      ></div>
    </div>
  );
};
export default ProgressBar;
