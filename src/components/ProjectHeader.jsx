import { useContext } from "react";
import { AppState } from "../App";
import ProgressBar from "./ProgressBar";

const ProjectHeader = () => {
  const { activeProject, activeTechdegree } = useContext(AppState);

  return (
    <div className="">
      <div className="p-5">
        <h2 className="font-bold text-3xl">{activeProject.title}</h2>
        <p>{activeTechdegree.name} Techdegree</p>
      </div>
      <div className="px-5">
        <ProgressBar />
      </div>
    </div>
  );
};
export default ProjectHeader;
