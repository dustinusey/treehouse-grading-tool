import { useContext } from "react";
import { AppState } from "../App";
import DefaultView from "./DefaultView";
import ProjectView from "./ProjectView";

const ViewContainer = () => {
  const { activeProject } = useContext(AppState);
  return (
    <div className="bg-white  dark:bg-[#45454B] w-full h-full overflow-auto rounded-2xl duration-200 p-5">
      {activeProject ? <ProjectView /> : <DefaultView />}
    </div>
  );
};
export default ViewContainer;
