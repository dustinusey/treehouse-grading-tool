import { useState, useEffect } from "react";
import { FaListCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { AppState } from "../App";

import ReviewItems from "../components/review-items/ReviewItems";

import { useContext } from "react";
import CommandMenu from "../components/CommandMenu";

const ReviewSidebar = ({ isSidebarOpen, onSidebarToggle }) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen);
  const [copied, setCopied] = useState(false);

  const {
    gradedRequirements,
    finalGradingReview,
    activeTechdegree,
    activeProject,
  } = useContext(AppState);

  const copyToClipboard = async () => {
    generateFinalReview();
    if (!finalGradingReview || !finalGradingReview.current) {
      console.error("No data to copy");
      return;
    }
    try {
      // Directly use the string as it is, assuming it's already formatted correctly
      await navigator.clipboard.writeText(finalGradingReview.current);
      console.log("Content copied to clipboard");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  // Here to handle the external change in App.jsx where if the grading is done, the sidebar opens
  useEffect(() => {
    setIsOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    onSidebarToggle(newOpenState); // Notify App.jsx about the new state
  };

  // Here for handling OPT / ALT + R shortcut
  const handleSidebarToggles = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyR") {
      toggleSidebar();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSidebarToggles);

    return () => {
      window.removeEventListener("keydown", handleSidebarToggles);
    };
  }, [handleSidebarToggles]);

  const generateFinalReview = () => {
    finalGradingReview.current = ''

    const sortedRequirements = gradedRequirements.sort((a, b) => {
      // First sort by grade
      const gradeOrder = { correct: 0, questioned: 1, needs: 2 }
      if (gradeOrder[a.grade] !== gradeOrder[b.grade]) {
        return gradeOrder[a.grade] - gradeOrder[b.grade]
      }
      // Then sort by isExceeds
      return Number(a.isExceeds) - Number(b.isExceeds)
    })

    // Group requirements by grade
    const correct = sortedRequirements.filter(r => r.grade === 'correct')
    const questioned = sortedRequirements.filter(r => r.grade === 'questioned')
    const needs = sortedRequirements.filter(r => r.grade === 'needs')

    // Build review string
    if (correct.length) {
      correct.forEach(r => {
        finalGradingReview.current += `:meets:${r.isExceeds ? ':exceeds: ' : ''}${r.title}\n`
      })
    }

    if (questioned.length) {
      finalGradingReview.current += '\n\n'
      questioned.forEach(r => {
        finalGradingReview.current += `:questioned:${r.isExceeds ? ':exceeds: ' : ''}${r.title}\n`
        if (r.notes) finalGradingReview.current += `> ${r.notes}\n\n`
      })
    }

    if (needs.length) {
      finalGradingReview.current += '\n'
      needs.forEach(r => {
        finalGradingReview.current += `:needs-work:${r.isExceeds ? ':exceeds: ' : ''}${r.title}\n`
        if (r.notes) finalGradingReview.current += `> ${r.notes}\n\n`
      })
    }
  };

  return (
    <div
      className={`${
        isOpen && "min-w-[450px] w-[450px]"
      } px-5 text-white duration-200`}
    >
      <CommandMenu copyToClipboard={copyToClipboard} />
      <div className="flex items-center justify-between h-[50px]">
        {isOpen && <p className="font-bold text-xl mr-5">Grading Review</p>}
        <button
          onClick={toggleSidebar}
          className={`${
            !isOpen ? "rounded-lg" : "rounded-full"
          } bg-zinc-700 text-white cursor-pointer size-[40px] grid place-items-center`}
        >
          {isOpen ? <IoCloseSharp /> : <FaListCheck />}
        </button>
      </div>

      {isOpen && (
        <div className="h-[92%] overflow-auto mt-10 pr-5 review-sidebar">
          {gradedRequirements.length !== 0 ? (
            <>
              <div className="bg-zinc-800 sticky top-0 pb-5">
                <button
                onClick={() => {
                  setCopied(true);
                  // copy contents of setfinalgradingreview to clipboard as text
                  copyToClipboard();
                }}
                style={
                  copied
                    ? {
                        backgroundColor:
                          activeTechdegree.color ||
                          activeProject.techdegree.color,
                      }
                    : {}
                }
                className="w-full p-4 text-center bg-zinc-700 rounded-lg hover:bg-zinc-600 duration-200"
                >
                  {copied ? "Review Copied!" : "Copy Review"}
                </button>
              </div>
            <ReviewItems items={gradedRequirements} />
            </>
          ) : (
            <p className="p-5 text-center text-sm text-zinc-400">
              You haven&apos;t graded anything yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default ReviewSidebar;
