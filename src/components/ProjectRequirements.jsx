import { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import GradingSection from "./GradingSection";

const ProjectRequirements = () => {
  const { activeProjectQuestions } = useContext(AppState);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions([]);
    activeProjectQuestions !== null &&
      activeProjectQuestions.map((question) => {
        setQuestions((prev) => [...prev, question]);
      });
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
