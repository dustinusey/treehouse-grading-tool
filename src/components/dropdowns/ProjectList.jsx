import { useContext, useEffect } from "react";
import { AppState } from "../../App";

import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProjectList = ({ setShowProjects }) => {
  const {
    activeProjectIndex,
    setActiveProjectIndex,
    activeTechdegree,
    setActiveTechdegree,
    activeProject,
    setActiveProject,
    setActiveProjectQuestions,
    setActiveProjectMockups,
    setCurrentStudyGuide,
    setGradedCorrect,
    setGradedQuestioned,
    setGradedWrong,
    setAnsweredCount,
  } = useContext(AppState);

  async function getActiveProjectData(project) {
    setActiveProjectQuestions(project.gradingSections);

    // reset mockup state
    setActiveProjectMockups([]);

    setProjectMedia(project);
  }

  // Set media for project
  const setProjectMedia = (project) => {
    // mobile mockups
    project.mockups.mobile !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Mobile", mock: project.mockups.mobile },
      ]);

    // tablet mockups
    project.mockups.tablet !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Tablet", mock: project.mockups.tablet },
      ]);

    // desktop mockups
    project.mockups.desktop !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Desktop", mock: project.mockups.desktop },
      ]);
    setCurrentStudyGuide(project.studyGuide || null);
  };

  // Created a helper function for readability
  const resetProjectState = () => {
    setAnsweredCount(0);
    setActiveProject(null);
    setActiveProjectIndex(null);
    setActiveProjectQuestions(null);
    setGradedCorrect([]);
    setGradedQuestioned([]);
    setGradedWrong([]);
  };

  useEffect(() => {
    if (activeProject) {
      getActiveProjectData(activeProject);
    }
  }, [activeProject]);

  return (
    <div>
      <ul className="slideInBigDawg bg-zinc-950 rounded-2xl p-2 overflow-hidden">
        <li className="p-2 flex justify-between items-center rounded-lg">
          <p className="text-lg pl-3 font-bold">Project List</p>
          <button
            onClick={() => {
              setShowProjects(false);
              activeProject === null && setActiveTechdegree(null);
            }}
            className="rounded-lg p-3 hover:bg-white hover:bg-opacity-15 duration-200 text-xl"
          >
            <IoClose />
          </button>
        </li>
        {activeTechdegree.projects.map((project, index) => {
          const isActive = index === activeProjectIndex;
          const itemClassNames = `py-3 px-5 pr-1 flex items-center hover:bg-white hover:bg-opacity-10 rounded-xl cursor-pointer duration-200 ${
            isActive ? "bg-white bg-opacity-10" : ""
          }`;
          return (
            <li
              className={`${
                isActive && "pointer-events-none"
              } ${itemClassNames}`}
              key={index}
              onClick={() => {
                resetProjectState();
                setActiveProjectIndex(index);
                setActiveProject(project);
              }}
            >
              <div className="text-2xl">
                {isActive ? <FaRegFolderOpen /> : <FaRegFolder />}
              </div>
              <p className="ml-5 mr-5 shorten1">{project.title}</p>

              {isActive && (
                <span
                  style={
                    isActive ? { backgroundColor: activeTechdegree.color } : {}
                  }
                  className="min-w-[10px] min-h-[10px] rounded-full ml-auto mr-5"
                ></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProjectList;
