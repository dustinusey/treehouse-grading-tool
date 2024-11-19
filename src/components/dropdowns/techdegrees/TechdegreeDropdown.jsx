import { useContext, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { AppState } from "../../../App";

import LoadingItem from "../LoadingItem";
import TechdegreeListItem from "./TechdegreeListItem";

const TechdegreeDropdown = () => {
  const {
    logo,
    allTechdegrees,
    activeTechdegree,
    setShowProjects,
    setActiveProjectIndex,
    activeProject,
    setActiveProject,
    setActiveProjectMockups,
    setCurrentStudyGuide,
  } = useContext(AppState);

  const [openDropdown, setOpenDropdown] = useState(false);

  // Created a helper function for readability
  const resetProjectState = () => {
    setShowProjects(false);
    setActiveProjectIndex(null);
    setActiveProject(null);
    setActiveProjectMockups([]);
    setCurrentStudyGuide(null);
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950 hover:bg-zinc-900 cursor-pointer duration-200 overflow-hidden">
      {/* Dropdown header */}
      <div
        onClick={() => {
          setOpenDropdown(!openDropdown);
          resetProjectState();
        }}
        className="flex items-center justify-between px-4 py-4"
      >
        {activeTechdegree !== null ? (
          <div
            style={{ backgroundColor: activeTechdegree.color }}
            className="min-w-[50px] min-h-[50px] rounded-xl grid place-items-center mr-3 duration-500"
          >
            <img className="w-full max-w-[30px]" src={logo} alt="" />
          </div>
        ) : (
          <div className="min-w-[50px] min-h-[50px] rounded-xl grid place-items-center mr-3 bg-zinc-400">
            <img className="w-full max-w-[30px]" src={logo} alt="" />
          </div>
        )}

        {activeTechdegree !== null ? (
          <div>
            <p className="font-bold">{activeTechdegree.name}</p>
            {activeProject !== null && (
              <p className="text-sm opacity-50 shorten1">
                {activeProject.title}
              </p>
            )}
          </div>
        ) : (
          <p className="font-bold">Choose a Techdegree</p>
        )}
        <button
          className={`${
            openDropdown && "rotate-180"
          } rounded-lg p-3 duration-200 text-xl ml-auto`}
        >
          <IoChevronDown />
        </button>
      </div>

      {/* Dropdown menu */}
      <ul
        className={`${
          openDropdown ? "h-auto" : "h-[0px]"
        } w-full duration-200 overflow-hidden`}
      >
        {allTechdegrees?.length === 0 ? (
          <LoadingItem text="Loading your Techdegree data..." />
        ) : (
          allTechdegrees.map((td, index) => (
            <TechdegreeListItem
              td={td}
              color={td.color}
              title={td.name}
              id={td.id}
              key={index}
              setOpenDropdown={setOpenDropdown}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TechdegreeDropdown;
