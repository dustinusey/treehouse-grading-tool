import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import GradingSection from "./GradingSection";

const ProjectRequirements = () => {
  const { activeProjectQuestions } = useContext(AppState);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections([]);
    activeProjectQuestions &&
      activeProjectQuestions.map((question) => {
        setSections((prev) => [...prev, question]);
      });
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
