import axios from "axios";
import { useContext, useEffect } from "react";
import { AppState } from "../../App";

import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProjectList = ({ projects }) => {
  const {
    showProjects,
    activeProjectIndex,
    setActiveProjectIndex,
    activeTechdegree,
    setActiveTechdegree,
    setShowProjects,
    activeProject,
    setActiveProject,
    activeProjectQuestions,
    setActiveProjectQuestions,
    setActiveProjectMockups,
    setCurrentStudyGuide,
    setGradedCorrect,
    setGradedQuestioned,
    setGradedWrong,
  } = useContext(AppState);

  async function getActiveProjectData(id) {
    let SINGLE_PROJECT_QUERY = encodeURIComponent(`
    *[_type == "project" && _id == "${id}"]{
        _id,
        title,
        studyGuide,
        mobileMockup,
        tabletMockup,
        desktopMockup,
        activeMockup,
        "gradingSections": *[_type == "gradingSection" && references(^._id)]|order(order){
            title,
            _id,
            "requirements": *[_type == "requirement" && references(^._id)]|order(order){
                title,
                _id,
                isExceeds,
            }
        },
        notes[]->
    }[0]
    `);
    let SINGLE_PROJECT_URL = `https://supw1mz3.api.sanity.io/v2021-10-21/data/query/production?query=${SINGLE_PROJECT_QUERY}`;

    let data = await axios.get(SINGLE_PROJECT_URL);
    setActiveProjectQuestions(data.data.result.gradingSections);

    // reset mockup state
    setActiveProjectMockups([]);

    setProjectMedia(data.data.result);
  }

  const setProjectMedia = (data) => {
    // mobile mockups
    data.mobileMockup !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Mobile", mock: data.mobileMockup },
      ]);

    // tablet mockups
    data.tabletMockup !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Tablet", mock: data.tabletMockup },
      ]);

    // desktop mockups
    data.desktopMockup !== null &&
      setActiveProjectMockups((prev) => [
        ...prev,
        { title: "Desktop", mock: data.desktopMockup },
      ]);

    // study guide
    data.studyGuide !== null
      ? setCurrentStudyGuide(data.studyGuide)
      : setCurrentStudyGuide(null);
  };

  useEffect(() => {
    activeProject !== null && getActiveProjectData(activeProject._id);
  }, [activeProject]);

  return (
    <div>
      {showProjects && (
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
          {projects.map((project, index) => {
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
                  setActiveProject(null);
                  setActiveProjectIndex(null);
                  setActiveProjectQuestions(null);
                  setGradedCorrect([]);
                  setGradedQuestioned([]);
                  setGradedWrong([]);
                  setActiveProjectIndex(index), setActiveProject(project);
                }}
              >
                <div className="text-2xl">
                  {isActive ? <FaRegFolderOpen /> : <FaRegFolder />}
                </div>
                <p className="ml-5 mr-5 shorten1">{project.title}</p>

                {isActive && (
                  <span
                    style={
                      isActive
                        ? { backgroundColor: activeTechdegree.color }
                        : {}
                    }
                    className="min-w-[10px] min-h-[10px] rounded-full ml-auto mr-5"
                  ></span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ProjectList;
