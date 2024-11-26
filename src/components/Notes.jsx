import { useContext, useRef, useState, useCallback } from "react";
import { AppState } from "../App";

const Notes = ({ req }) => {
  const { gradedQuestioned, gradedWrong, setGradedQuestioned, setGradedWrong } =
    useContext(AppState);

  // Local state for the textarea value
  const [noteText, setNoteText] = useState(() => {
    // Initialize from the appropriate graded array
    const questionedItem = gradedQuestioned.find(item => item.id === req._id);
    const wrongItem = gradedWrong.find(item => item.id === req._id);
    return (questionedItem?.notes || wrongItem?.notes || '');
  });

  // Debounced update to context
  const updateTimeout = useRef(null);

  const handleTextareaChange = useCallback((e) => {
    const newValue = e.target.value;
    setNoteText(newValue);

    // Clear any existing timeout
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    // Set a new timeout to update the context
    updateTimeout.current = setTimeout(() => {
      const updateState = gradedQuestioned.some((item) => item.id === req._id)
        ? setGradedQuestioned
        : gradedWrong.some((item) => item.id === req._id)
        ? setGradedWrong
        : null;

      if (updateState) {
        updateState((prev) =>
          prev.map((item) =>
            item.id === req._id ? { ...item, notes: newValue } : item
          )
        );
      }
    }, 500); // Debounce time of 500ms
  }, [req._id, gradedQuestioned, gradedWrong, setGradedQuestioned, setGradedWrong]);

  return (
    <textarea
      value={noteText}
      className="bg-white dark:bg-zinc-700 w-[98%] rounded-lg animateLilBuddy resize-none p-3 mr-5 outline-none"
      onChange={handleTextareaChange}
    />
  );
};

export default Notes;
