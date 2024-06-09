import { useContext, useState } from "react";
import { AppState } from "../App";

const Notes = ({ req }) => {
  const { gradedQuestioned, gradedWrong, setGradedQuestioned, setGradedWrong } =
    useContext(AppState);

  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (e) => {
    const newValue = e.target.value;
    setTextareaValue(newValue);

    // Determine which state to update based on the ID
    const updateState = gradedQuestioned.some((item) => item.id === req._id)
      ? setGradedQuestioned
      : gradedWrong.some((item) => item.id === req._id)
      ? setGradedWrong
      : null;

    // Update the corresponding state
    if (updateState) {
      updateState((prev) =>
        prev.map((item) =>
          item.id === req._id ? { ...item, notes: newValue } : item
        )
      );
    }
  };

  return (
    <textarea
      className="bg-white dark:bg-zinc-700 w-[98%] rounded-lg animateLilBuddy resize-none p-3 mr-5 outline-none"
      value={textareaValue}
      onChange={handleTextareaChange}
    ></textarea>
  );
};
export default Notes;
