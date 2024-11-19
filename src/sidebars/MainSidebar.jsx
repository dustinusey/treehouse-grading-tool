import { useContext, useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { IoChevronBack, IoChevronForwardOutline } from "react-icons/io5";
import { LuMoonStar } from "react-icons/lu";
import { AppState } from "../App";

import ProjectList from "../components/dropdowns/ProjectList";

import LinksDropdown from "../components/dropdowns/links/LinksDropdown";
import ProjectMediaDropdown from "../components/dropdowns/project-media/ProjectMediaDropdown";
import TechdegreeDropdown from "../components/dropdowns/techdegrees/TechdegreeDropdown";

const MainSidebar = () => {
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true);

  const {
    darkMode,
    setDarkMode,
    showProjects,
    activeProject,
    setActiveTechdegree,
    activeTechdegree,
    setShowProjects,
    reviewSidebarOpen,
    setReviewSidebarOpen,
  } = useContext(AppState);

  const handleSidebarToggles = (event) => {
    //main sidebar
    if (event.altKey && event.code === "KeyE") {
      setMainSidebarOpen(!mainSidebarOpen);
    }
    //review sidebar
    if (event.altKey && event.code === "KeyR") {
      setReviewSidebarOpen(!reviewSidebarOpen);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSidebarToggles);

    return () => {
      window.removeEventListener("keydown", handleSidebarToggles);
    };
  }, [mainSidebarOpen, reviewSidebarOpen]);

  return (
    <div
      className={`${
        mainSidebarOpen && "min-w-[400px] w-[400px]"
      } px-5 text-white flex flex-col`}
    >
      {/* header */}
      <div className="flex items-center justify-between h-[50px]">
        {mainSidebarOpen && (
          <div className="relative">
            <h1 className="font-bold text-xl">Treehouse Grading Tool</h1>
            <p className="opacity-50 text-sm">
              Choose a Techdegree project to grade
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setMainSidebarOpen(!mainSidebarOpen);
            setShowProjects(false);
            activeProject === null && setActiveTechdegree(null);
            activeProject !== null &&
              setActiveTechdegree(activeTechdegree, setShowProjects(true));
          }}
          className={`${
            !mainSidebarOpen ? "rounded-lg" : "ml-auto rounded-full"
          } bg-zinc-700 text-white cursor-pointer size-[40px] grid place-items-center`}
        >
          {mainSidebarOpen ? <IoChevronBack /> : <IoChevronForwardOutline />}
        </button>
      </div>
      {/* dropdowns*/}
      {mainSidebarOpen && (
        <div className="mt-5 flex flex-col gap-2">
          <TechdegreeDropdown />

          {showProjects && activeTechdegree && <ProjectList />}

          <LinksDropdown />
          <ProjectMediaDropdown />
        </div>
      )}
      <div
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        className={`${
          !mainSidebarOpen
            ? "m-auto mt-0  rounded-lg"
            : "ml-auto mt-5 text-lg rounded-full"
        } bg-zinc-700 text-white cursor-pointer size-[40px] grid place-items-center overflow-hidden`}
      >
        {darkMode ? (
          <FiSun className="goodmornightlol" />
        ) : (
          <LuMoonStar className="goodmornightlol" />
        )}
      </div>
    </div>
  );
};
export default MainSidebar;
