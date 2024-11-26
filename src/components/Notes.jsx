import { useContext, useRef, useState, useCallback } from "react";
import { AppState } from "../App";

const Notes = ({ req }) => {
  const { gradedRequirements, setGradedRequirements } = useContext(AppState);

  const [noteText, setNoteText] = useState(() => {
    const requirement = gradedRequirements.find(item => item.id === req._id);
    return requirement?.notes || '';
  });

  const updateTimeout = useRef(null);

  const handleTextareaChange = useCallback((e) => {
    const newValue = e.target.value;
    setNoteText(newValue);

    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    updateTimeout.current = setTimeout(() => {
      setGradedRequirements(prev =>
        prev.map(item =>
          item.id === req._id ? { ...item, notes: newValue } : item
        )
      );
    }, 500);
  }, [req._id, setGradedRequirements]);

  return (
    <textarea
      value={noteText}
      className="bg-white dark:bg-zinc-700 w-[98%] rounded-lg animateLilBuddy resize-none p-3 mr-5 outline-none"
      onChange={handleTextareaChange}
    />
  );
};

export default Notes;
