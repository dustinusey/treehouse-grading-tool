import { useState } from "react";
import { FaListCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { AppState } from "../App";

import ReviewItemsCorrect from "../components/review-items/ReviewItemsCorrect";
import ReviewItemsQuestioned from "../components/review-items/ReviewItemsQuestioned";
import ReviewItemsWrong from "../components/review-items/ReviewItemsWrong";

import { useContext } from "react";

const ReviewSidebar = () => {
  const [copied, setCopied] = useState(false);
  const {
    reviewSidebarOpen,
    setReviewSidebarOpen,
    gradedCorrect,
    gradedQuestioned,
    gradedWrong,
    finalGradingReview,
    activeTechdegree,
  } = useContext(AppState);

  const copyToClipboard = async () => {
    if (!finalGradingReview || !finalGradingReview.current) {
      console.error("No data to copy");
      return;
    }
    try {
      // Directly use the string as it is, assuming it's already formatted correctly
      await navigator.clipboard.writeText(finalGradingReview.current);
      console.log("Content copied to clipboard");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div
      className={`${
        reviewSidebarOpen && "min-w-[450px] w-[450px]"
      } px-5 text-white duration-200`}
    >
      <div className="flex items-center justify-between h-[50px]">
        {reviewSidebarOpen && (
          <p className="font-bold text-xl mr-5">Grading Review</p>
        )}
        <button
          onClick={() => {
            setReviewSidebarOpen(!reviewSidebarOpen);
          }}
          className={`${
            !reviewSidebarOpen ? "rounded-lg" : "rounded-full"
          } bg-zinc-700 text-white cursor-pointer size-[40px] grid place-items-center`}
        >
          {reviewSidebarOpen ? <IoCloseSharp /> : <FaListCheck />}
        </button>
      </div>

      {reviewSidebarOpen && (
        <div className="h-[92%] overflow-auto mt-10 pr-5">
          {gradedCorrect.length !== 0 ||
          gradedQuestioned.length !== 0 ||
          gradedWrong.length !== 0 ? (
            <div className="bg-zinc-800 sticky top-0 pb-5">
              <button
                onClick={() => {
                  setCopied(true);

                  // future todo: filter options. prob in 2065 if time allows

                  finalGradingReview.current = "";

                  // correct
                  const correct = gradedCorrect.filter(
                    (item) => !item.isExceeds,
                  );
                  const correctAndExceeds = gradedCorrect.filter(
                    (item) => item.isExceeds,
                  );

                  // questioned
                  const questioned = gradedQuestioned.filter(
                    (item) => !item.isExceeds,
                  );
                  const questionedAndExceeds = gradedQuestioned.filter(
                    (item) => item.isExceeds,
                  );

                  // wrong
                  const wrong = gradedWrong.filter((item) => !item.isExceeds);
                  const wrongAndExceeds = gradedWrong.filter(
                    (item) => item.isExceeds,
                  );

                  // in order of default output
                  finalGradingReview.current += "You got these right:\n\n";
                  correct.map((item) => {
                    finalGradingReview.current += `:meets: ${item.title}\n`;
                  });
                  finalGradingReview.current += "\n\n\n";

                  finalGradingReview.current += "These need review:\n\n";
                  questioned.map((item) => {
                    finalGradingReview.current += `:questioned: ${
                      item.title
                    }\n> ${item.notes && item.notes}\n`;
                  });
                  finalGradingReview.current += "\n\n\n";

                  finalGradingReview.current +=
                    "You'll need to go back and rework these:\n\n";
                  wrong.map((item) => {
                    finalGradingReview.current += `:needs-work: ${
                      item.title
                    }\n> ${item.notes && item.notes}\n`;
                  });
                  finalGradingReview.current += "\n\n\n";

                  finalGradingReview.current +=
                    "EXCEEDS EXPECTATIONS REQUIREMENTS:\n\n\n";
                  finalGradingReview.current +=
                    "You got these Exceeds requirements right:\n\n";
                  correctAndExceeds.map((item) => {
                    finalGradingReview.current += `:meets: :exceeds: EXCEEDS: ${item.title}\n`;
                  });
                  finalGradingReview.current += "\n\n\n";

                  finalGradingReview.current +=
                    "These Exceeds requirements need review:\n\n";
                  questionedAndExceeds.map((item) => {
                    finalGradingReview.current += `:questioned: :exceeds: ${
                      item.title
                    }\n> ${item.notes && item.notes}\n`;
                  });

                  finalGradingReview.current +=
                    "These Exceeds requirements need some work:\n\n";
                  wrongAndExceeds.map((item) => {
                    finalGradingReview.current += `:needs-work: :exceeds: ${
                      item.title
                    }\n> ${item.notes && item.notes}\n`;
                  });
                  finalGradingReview.current += "\n\n\n";

                  // copy contents of setfinalgradingreview to clipboard as text
                  copyToClipboard();
                  setTimeout(() => {
                    window.location.reload();
                  }, 2500);
                }}
                style={
                  copied ? { backgroundColor: activeTechdegree.color } : {}
                }
                className="w-full p-4 text-center bg-zinc-700 rounded-lg hover:bg-zinc-600 duration-200"
              >
                {copied ? "Review Copied!" : "Copy Review"}
              </button>
            </div>
          ) : (
            <p className="p-5 text-center text-sm text-zinc-400">
              You haven&apos;t graded anything yet.
            </p>
          )}

          {gradedCorrect.length !== 0 && (
            <div className="mt-10">
              <h3 className="text-[#54CD76] text-xl uppercase font-bold">
                These were right
              </h3>
              <ReviewItemsCorrect review={gradedCorrect} />
            </div>
          )}

          {gradedQuestioned.length !== 0 && (
            <div className="mt-10 ">
              <h3 className="text-[#F4AA52] text-xl uppercase font-bold">
                These were questionable
              </h3>

              <ReviewItemsQuestioned review={gradedQuestioned} />
            </div>
          )}

          {gradedWrong.length !== 0 && (
            <div className="mt-10">
              <h3 className="text-[#F45C52] text-xl uppercase font-bold">
                These were wrong
              </h3>

              <ReviewItemsWrong review={gradedWrong} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ReviewSidebar;
