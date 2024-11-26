import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import GradingSection from "./GradingSection";
import { getActiveProjectData } from "./dropdowns/ProjectList";

const ProjectRequirements = () => {
  const { activeProject, activeProjectQuestions, setActiveProjectQuestions } =
    useContext(AppState);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections([]);
    if (activeProjectQuestions) {
      activeProjectQuestions.map((question) => {
        setSections((prev) => [...prev, question]);
      });
    } else {
      getActiveProjectData(activeProject, setActiveProjectQuestions);
    }
  }, [activeProjectQuestions]);

  return (
    <ul className="pb-5 px-5">
      {sections.map((section, index) => {
        return <GradingSection key={index} index={index} section={section} />;
      })}
    </ul>
  );
};
export default ProjectRequirements;
