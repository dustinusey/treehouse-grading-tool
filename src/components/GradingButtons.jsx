import { useContext } from "react";
import { AppState } from "../App";

import { FaRedo } from "react-icons/fa";
import { FaCheck, FaQuestion } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const GradingButtons = ({ req, graded, setGraded, setGrade, setShowNotes }) => {
  const { setGradedRequirements, setAnsweredCount } = useContext(AppState)

  const buttonStyles = 'size-[50px] rounded-xl border-2 border-zinc-200 dark:border-zinc-900 grid place-items-center bg-white hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-200 cursor-pointer'

  function handleGrade(grade) {
    setAnsweredCount(prev => prev + 1)
    setGraded(true)
    if (grade !== 'correct') setShowNotes(true)
    setGrade(grade)

    setGradedRequirements(prev => {
      const exists = prev.find(item => item.id === req._id)
      if (!exists) {
        return [...prev, {
          id: req._id,
          title: req.title,
          isExceeds: req.isExceeds,
          grade,
          notes: ''
        }]
      }
      return prev.map(item =>
        item.id === req._id ? { ...item, grade } : item
      )
    })
  }

  function handleReset() {
    setAnsweredCount(prev => prev - 1)
    setGraded(false)
    setGrade(null)
    setShowNotes(false)
    setGradedRequirements(prev =>
      prev.filter(item => item.id !== req._id)
    )
  }

  return (
    <ul className="my-3 flex items-center gap-2">
      <li onClick={() => handleGrade('correct')} className={`${graded ? 'disabled' : ''} ${buttonStyles}`}>
        <FaCheck />
      </li>
      <li onClick={() => handleGrade('questioned')} className={`${graded ? 'disabled' : ''} ${buttonStyles}`}>
        <FaQuestion />
      </li>
      <li onClick={() => handleGrade('needs')} className={`${graded ? 'disabled' : ''} ${buttonStyles}`}>
        <IoClose className="text-xl" />
      </li>
      <li onClick={handleReset} className={`${!graded ? 'disabled' : ''} ${buttonStyles}`}>
        <FaRedo />
      </li>
    </ul>
  )
}

export default GradingButtons;
