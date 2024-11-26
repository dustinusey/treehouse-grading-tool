import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import GradingSection from "./GradingSection";

const ProjectRequirements = () => {
  const { activeProject } = useContext(AppState);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections([]);
    if (activeProject?.gradingSections) {
      setSections(activeProject.gradingSections);
    }
  }, [activeProject]);

  return (
    <ul className="pb-5 px-5">
      {sections.map((section, index) => {
        return <GradingSection key={index} index={index} section={section} />;
      })}
    </ul>
  );
};
export default ProjectRequirements;
