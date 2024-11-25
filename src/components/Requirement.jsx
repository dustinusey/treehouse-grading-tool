import { useContext, useState } from "react";
import { AppState } from "../App";
import GradingButtons from "./GradingButtons";
import Notes from "./Notes";

const Requirement = ({ req, index }) => {
  const { activeTechdegree, excludeExceeds, activeProject } = useContext(AppState);

  const [graded, setGraded] = useState(false);
  const [grade, setGrade] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      {excludeExceeds && req.isExceeds ? (
        <li
          className={`${
            req.isExceeds &&
            "bg-[#F5F0D1] dark:bg-[#00000043] pointer-events-none opacity-25"
          } pl-10 pr-5 py-5 text-zinc-800 dark:text-white border-b-2 border-zinc-200 dark:border-zinc-900 last-of-type:border-none last-of-type:rounded-br-xl last-of-type:rounded-bl-xl duration-200`}
          key={index}
        >
          <div className="pl-2 flex items-center gap-2 relative">
            {graded && (
              <span
                style={
                  graded && grade === "correct"
                    ? { backgroundColor: activeTechdegree.color }
                    : {}
                }
                className={`absolute top-1/2 left-[10px] -translate-x-1/2 -translate-y-1/2 mr-5 w-[5px] min-w-[5px] h-[100%] block rounded-xl duration-200 ${
                  grade === "questioned"
                    ? "bg-orange-400 dark:bg-orange-300"
                    : grade === "wrong"
                    ? "bg-red-400"
                    : ""
                }`}
              ></span>
            )}
            <div className={`${graded && "ml-10"} duration-200 w-full`}>
              <p className=" text-yellow-600 dark:text-yellow-500 font-bold duration-200">
                {req.isExceeds && "EXCEEDS"}
              </p>
              <p className="text-lg mb-3">{req.title}</p>
              {showNotes && <Notes req={req} />}
              <GradingButtons
                req={req}
                graded={graded}
                setGraded={setGraded}
                setGrade={setGrade}
                showNotes={showNotes}
                setShowNotes={setShowNotes}
              />
            </div>
          </div>
        </li>
      ) : (
        <li
          className={`${
            req.isExceeds && "bg-[#F5F0D1] dark:bg-[#00000043]"
          } pl-10 pr-5 py-5 text-zinc-800 dark:text-white border-b-2 border-zinc-200 dark:border-zinc-900 last-of-type:border-none last-of-type:rounded-br-xl last-of-type:rounded-bl-xl duration-200`}
          key={index}
        >
          <div className="pl-2 flex items-center gap-2 relative">
            {graded && (
              <span
                style={
                  graded && grade === "correct"
                    ? {
                    backgroundColor:
                      activeTechdegree?.color || activeProject.techdegree.color,
                  }
                    : {}
                }
                className={`absolute top-1/2 left-[10px] -translate-x-1/2 -translate-y-1/2 mr-5 w-[5px] min-w-[5px] h-[100%] block rounded-xl duration-200 ${
                  grade === "questioned"
                    ? "bg-orange-400 dark:bg-orange-300"
                    : grade === "wrong"
                      ? "bg-red-400"
                      : ""
                }`}
              ></span>
            )}
            <div className={`${graded && "ml-10"} duration-200 w-full`}>
              <p className=" text-yellow-600 dark:text-yellow-500 font-bold duration-200">
                {req.isExceeds && "EXCEEDS"}
              </p>
              <p className="text-lg mb-3">{req.title}</p>
              {showNotes && <Notes req={req} />}
              <GradingButtons
                req={req}
                graded={graded}
                setGraded={setGraded}
                setGrade={setGrade}
                showNotes={showNotes}
                setShowNotes={setShowNotes}
              />
            </div>
          </div>
        </li>
      )}
    </>
  );
};
export default Requirement;
