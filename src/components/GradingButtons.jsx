import { useContext } from "react";
import { AppState } from "../App";

import { FaRedo } from "react-icons/fa";
import { FaCheck, FaQuestion } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const GradingButtons = ({ req, graded, setGraded, setGrade, setShowNotes }) => {
  const { setGradedCorrect, setGradedQuestioned, setGradedWrong } =
    useContext(AppState);

  const buttonStyles =
    "size-[50px] rounded-xl border-2 border-zinc-200 dark:border-zinc-900 grid place-items-center bg-white hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-200 cursor-pointer";

  return (
    <ul className="my-3 flex items-center gap-2">
      <li
        onClick={() => {
          setGraded(true);
          setGrade("correct");
          setGradedCorrect((prev) => {
            const itemExists = prev.some((item) => item.id === req._id);
            if (!itemExists) {
              return [
                ...prev,
                { id: req._id, title: req.title, isExceeds: req.isExceeds },
              ];
            }
            return prev;
          });
        }}
        className={`${graded ? "disabled" : ""} ${buttonStyles}`}
      >
        <FaCheck />
      </li>
      <li
        onClick={() => {
          setGraded(true);
          setShowNotes(true);
          setTimeout(() => {
            setGrade("questioned");
          }, 300);
          setGradedQuestioned((prev) => {
            const itemExists = prev.some((item) => item.id === req._id);
            if (!itemExists) {
              return [
                ...prev,
                { id: req._id, title: req.title, isExceeds: req.isExceeds },
              ];
            }
            return prev;
          });
        }}
        className={`${graded ? "disabled" : ""} ${buttonStyles}`}
      >
        <FaQuestion />
      </li>
      <li
        onClick={() => {
          setGraded(true);
          setShowNotes(true);
          setTimeout(() => {
            setGrade("wrong");
          }, 300);
          setShowNotes(true);
          setGradedWrong((prev) => {
            const itemExists = prev.some((item) => item.id === req._id);
            if (!itemExists) {
              return [
                ...prev,
                { id: req._id, title: req.title, isExceeds: req.isExceeds },
              ];
            }
            return prev;
          });
        }}
        className={`${graded ? "disabled" : ""} ${buttonStyles}`}
      >
        <IoClose className="text-xl" />
      </li>
      <li
        onClick={() => {
          // Set graded to true to indicate an item has been graded
          setGraded(false);
          setGrade(null);

          setShowNotes(false);
          // Update gradedCorrect by filtering out the item with the matching ID
          setGradedCorrect((prev) =>
            prev.filter((item) => item.id !== req._id)
          );

          // Update gradedQuestioned by filtering out the item with the matching ID
          setGradedQuestioned((prev) =>
            prev.filter((item) => item.id !== req._id)
          );

          // Update gradedWrong by filtering out the item with the matching ID
          setGradedWrong((prev) => prev.filter((item) => item.id !== req._id));
        }}
        className={buttonStyles}
      >
        <FaRedo />
      </li>
    </ul>
  );
};

export default GradingButtons;
