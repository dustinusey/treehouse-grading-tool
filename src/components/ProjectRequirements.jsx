import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import GradingSection from "./GradingSection";
import { getActiveProjectData } from "./dropdowns/ProjectList";

const ProjectRequirements = () => {
  const { activeProject, activeProjectQuestions, setActiveProjectQuestions } =
    useContext(AppState);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions([]);

    if (activeProjectQuestions !== null) {
      activeProjectQuestions.map((question) => {
        setQuestions((prev) => [...prev, question]);
      });
    } else {
      getActiveProjectData(activeProject._id).then((data) =>
        setActiveProjectQuestions(data.data.result.gradingSections),
      );
    }
  }, [activeProjectQuestions]);

  return (
    <ul className="pb-5 px-5">
      {questions.map((question, index) => {
        return <GradingSection key={index} index={index} question={question} />;
      })}
    </ul>
  );
};
export default ProjectRequirements;
