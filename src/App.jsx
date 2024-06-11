import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

import Overlay from "./components/Overlay";
import MainSidebar from "./sidebars/MainSidebar";
import ReviewSidebar from "./sidebars/ReviewSidebar";
import ViewContainer from "./views/ViewContainer";

import logo from "./assets/thlogo.png";

// app state
export const AppState = createContext();

const App = () => {
  // theme
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    return mode === "true" ? true : false;
  });
  // main sidebar
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true);
  // review sidebar
  const [reviewSidebarOpen, setReviewSidebarOpen] = useState(false);
  // techdegrees
  const [activeTechdegree, setActiveTechdegree] = useState(null);
  const [techdegrees, setTechdegrees] = useState([]);
  const [techdegreesLoaded, setTechdegreesLoaded] = useState(false);
  // projects
  const [projects, setProjects] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  // active project list items in sidebar
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [activeProjectQuestions, setActiveProjectQuestions] = useState(null);
  // project media
  const [activeProjectMockups, setActiveProjectMockups] = useState([]);
  const [currentMockup, setCurrentMockup] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [currentStudyGuide, setCurrentStudyGuide] = useState(null);
  // graded requirements
  const [gradedCorrect, setGradedCorrect] = useState([]);
  const [gradedQuestioned, setGradedQuestioned] = useState([]);
  const [gradedWrong, setGradedWrong] = useState([]);
  const finalGradingReview = useRef("");

  // grabbing dark theme from localstorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // getting techdegree dat  console.log(techdegrees);a
  useEffect(() => {
    async function getTDs() {
      let TDS_QUERY = encodeURIComponent('*[_type == "techdegree"]');
      let TDS_URL = `https://supw1mz3.api.sanity.io/v2021-10-21/data/query/production?query=${TDS_QUERY}`;
      let data = await axios.get(TDS_URL);
      setTechdegreesLoaded(true);
      setTechdegrees(data.data.result);
    }
    getTDs();
  }, []);

  useEffect(() => {
    async function getProjects() {
      let PROJECTS_QUERY;
      if (activeTechdegree !== null) {
        PROJECTS_QUERY = encodeURIComponent(`
          *[_type == "techdegree" && _id == "${activeTechdegree._id}"]{
              _id,
              color,
              name,
              "projects": *[_type == "project" && references(^._id)] | order(projectNumber){
                  title,
                  _id
              },
              resources[]->{
                  title,
                  description,
                  link
              }
          }[0]
          `);
      } else {
        PROJECTS_QUERY = encodeURIComponent(`
          *[_type == "techdegree"]{
              _id,
              color,
              name,
              "projects": *[_type == "project"] | order(projectNumber){
                  title,
                  _id
              },
              resources[]->{
                  title,
                  description,
                  link
              }
          }[0]
          `);
      }
      let PROJECTS_URL = `https://supw1mz3.api.sanity.io/v2021-10-21/data/query/production?query=${PROJECTS_QUERY}`;

      let data = await axios.get(PROJECTS_URL);
      setProjects(data.data.result.projects);
    }

    getProjects();
  }, [activeTechdegree]);

  return (
    <AppState.Provider
      value={{
        // theme
        darkMode,
        setDarkMode,
        // th logo
        logo,
        // main sidebar
        mainSidebarOpen,
        setMainSidebarOpen,
        // review sidebar
        reviewSidebarOpen,
        setReviewSidebarOpen,
        // techdgrees & loading
        techdegrees,
        setTechdegrees,
        techdegreesLoaded,
        setTechdegreesLoaded,
        activeTechdegree,
        setActiveTechdegree,
        // projects
        projects,
        showProjects,
        setShowProjects,
        activeProject,
        setActiveProject,
        // active project list items
        activeProjectIndex,
        setActiveProjectIndex,
        activeProjectQuestions,
        setActiveProjectQuestions,
        // project media
        activeProjectMockups,
        setActiveProjectMockups,
        activeOverlay,
        setActiveOverlay,
        currentMockup,
        setCurrentMockup,
        currentStudyGuide,
        setCurrentStudyGuide,
        // grading requirements
        gradedCorrect,
        setGradedCorrect,
        gradedQuestioned,
        setGradedQuestioned,
        gradedWrong,
        setGradedWrong,
        finalGradingReview,
      }}
    >
      <div className="h-screen w-full overflow-hidden bg-zinc-800 py-5 flex ">
        {activeOverlay && <Overlay />}

        <MainSidebar />
        <ViewContainer />
        <ReviewSidebar />
      </div>
    </AppState.Provider>
  );
};
export default App;
