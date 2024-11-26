import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

import Overlay from "./components/Overlay";
import MainSidebar from "./sidebars/MainSidebar";
import ReviewSidebar from "./sidebars/ReviewSidebar";
import ViewContainer from "./views/ViewContainer";

// app state
export const AppState = createContext();

const App = () => {
  // theme
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    return mode === "true" ? true : false;
  });
  const [reviewSidebarOpen, setReviewSidebarOpen] = useState(false);
  // techdegrees
  const [activeTechdegree, setActiveTechdegree] = useState(null);
  const [allTechdegrees, setAllTechdegrees] = useState([]); // NEW FOR TESTING (TA)
  // projects
  const [allProjects, setAllProjects] = useState(null); // NEW FOR TESTING (TA)
  const [activeProject, setActiveProject] = useState(null);
  // active project list items in sidebar
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [activeProjectQuestions, setActiveProjectQuestions] = useState(null);
  // project media
  const [currentMockup, setCurrentMockup] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(false);
  // graded requirements
  const [gradedCorrect, setGradedCorrect] = useState([]);
  const [gradedQuestioned, setGradedQuestioned] = useState([]);
  const [gradedWrong, setGradedWrong] = useState([]);
  const [gradedRequirements, setGradedRequirements] = useState([])
  const finalGradingReview = useRef("");
  const [excludeExceeds, setExcludeExceeds] = useState(false);
  // progress bar
  const allQuestions = useRef([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  // getting all current projects questions
  useEffect(() => {
    allQuestions.current = [];
    activeProjectQuestions &&
      activeProjectQuestions.forEach((question) => {
        question.requirements.forEach((requirement) => {
          allQuestions.current.push(requirement);
        });
      });
  }, [activeProjectQuestions]);

  // toggles grading review sidebar
  const handleSidebarToggle = (isOpen) => {
    setReviewSidebarOpen(isOpen);
  };

  // toggles grading review sidebar and main sidebar upon completion of grading
  useEffect(() => {
    if ((answeredCount / allQuestions.current.length) * 100 >= 100) {
      setReviewSidebarOpen(true);
    }
  }, [answeredCount]);

  // grabbing dark theme from localstorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch all TD dat  console.log(techdegrees);a in one call and set allTD / allProject states
  useEffect(() => {
    async function fetchAllData() {
      const ALL_DATA_QUERY = encodeURIComponent(`
        *[_type == "techdegree"]{
          _id,
          color,
          name,
          "projects": *[_type == "project" && references(^._id)] | order(projectNumber){
            _id,
            title,
            projectNumber,
            studyGuide,
            "mockups": {
              "mobile": mobileMockup,
              "tablet": tabletMockup,
              "desktop": desktopMockup
            },
            notes[]->{
              title,
              content,
              createdAt
            },
            "gradingSections": *[_type == "gradingSection" && references(^._id)]|order(order){
              _id,
              title,
              "requirements": *[_type == "requirement" && references(^._id)]|order(order){
                _id,
                title,
                description,
                isExceeds
              }
            },
            resources[]->{
              title,
              description,
              link
            }
          }
        }
      `);
      const ALL_DATA_URL = `https://supw1mz3.api.sanity.io/v2021-10-21/data/query/production?query=${ALL_DATA_QUERY}`;

      try {
        const response = await axios.get(ALL_DATA_URL);
        const result = response.data.result;

        // Store all TD Data
        setAllTechdegrees(result);
        // Create an array of all projects and add their TD name for future possible searching.
        const allProjects = result.flatMap((td) =>
          td.projects.map((project) => ({
            ...project, // Spread existing properties
            tdName: td.name, // Add Techdegree name to each project
          }))
        );

        // Store all projects
        setAllProjects(allProjects);
      } catch (error) {
        console.error("Error fetching all data:", error);
      }
    }

    fetchAllData();
  }, []);

  return (
    <AppState.Provider
      value={{
        // techdgrees & loading
        allTechdegrees,
        activeTechdegree,
        setActiveTechdegree,
        darkMode,
        setDarkMode,
        // projects
        allProjects,
        activeProject,
        setActiveProject,
        // active project list items
        activeProjectIndex,
        setActiveProjectIndex,
        activeProjectQuestions,
        setActiveProjectQuestions,
        // project media
        activeOverlay,
        setActiveOverlay,
        currentMockup,
        setCurrentMockup,
        // grading requirements
        gradedCorrect,
        setGradedCorrect,
        gradedQuestioned,
        setGradedQuestioned,
        gradedWrong,
        setGradedWrong,
        gradedRequirements,
        setGradedRequirements,
        finalGradingReview,
        excludeExceeds,
        setExcludeExceeds,
        // progress bar
        allQuestions,
        answeredCount,
        setAnsweredCount,
      }}
    >
      <div className="h-screen w-full overflow-hidden bg-zinc-800 py-5 flex ">
        {activeOverlay && <Overlay />}
        <MainSidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <ViewContainer />
        <ReviewSidebar
          isSidebarOpen={reviewSidebarOpen}
          onSidebarToggle={handleSidebarToggle}
        />
      </div>
    </AppState.Provider>
  );
};
export default App;
