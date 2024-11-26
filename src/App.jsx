import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

import Overlay from "./components/Overlay";
import MainSidebar from "./sidebars/MainSidebar";
import ReviewSidebar from "./sidebars/ReviewSidebar";
import ViewContainer from "./views/ViewContainer";
import { ThemeProvider } from "./context/ThemeContext";

// app state
export const AppState = createContext();

const App = () => {
  // techdegrees
  const [activeTechdegree, setActiveTechdegree] = useState(null);
  const [allTechdegrees, setAllTechdegrees] = useState([]);
  // projects
  const [allProjects, setAllProjects] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  // project media
  const [activeOverlay, setActiveOverlay] = useState(false);
  // graded requirements
  const [gradedRequirements, setGradedRequirements] = useState([])
  const [excludeExceeds, setExcludeExceeds] = useState(false);

  console.log(activeProject)
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
    <ThemeProvider>
    <AppState.Provider
      value={{
        // techdgrees & loading
        allTechdegrees,
        activeTechdegree,
        setActiveTechdegree,
        // projects
        allProjects,
        activeProject,
        setActiveProject,
        // project media
        activeOverlay,
        setActiveOverlay,
        // grading requirements
        gradedRequirements,
        setGradedRequirements,
        excludeExceeds,
        setExcludeExceeds,
      }}
    >
      <div className="h-screen w-full overflow-hidden bg-zinc-800 py-5 flex ">
        {activeOverlay && <Overlay />}
        <MainSidebar />
        <ViewContainer />
        <ReviewSidebar />
      </div>
    </AppState.Provider>
    </ThemeProvider>
  );
};
export default App;
