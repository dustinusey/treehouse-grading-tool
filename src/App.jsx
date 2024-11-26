import { useState, createContext } from "react";
import Overlay from "./components/Overlay";
import MainSidebar from "./sidebars/MainSidebar";
import ReviewSidebar from "./sidebars/ReviewSidebar";
import ViewContainer from "./views/ViewContainer";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectDataProvider } from "./context/ProjectDataContext";

// app state
export const AppState = createContext();

const App = () => {
  // Only keep active states in AppState
  const [activeTechdegree, setActiveTechdegree] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [gradedRequirements, setGradedRequirements] = useState([]);
  const [excludeExceeds, setExcludeExceeds] = useState(false);

  return (
    <ThemeProvider>
      <ProjectDataProvider>
        <AppState.Provider
          value={{
            activeTechdegree,
            setActiveTechdegree,
            activeProject,
            setActiveProject,
            activeOverlay,
            setActiveOverlay,
            gradedRequirements,
            setGradedRequirements,
            excludeExceeds,
            setExcludeExceeds,
          }}
        >
          <div className="h-screen w-full overflow-hidden bg-zinc-800 py-5 flex">
            {activeOverlay && <Overlay />}
            <MainSidebar />
            <ViewContainer />
            <ReviewSidebar />
          </div>
        </AppState.Provider>
      </ProjectDataProvider>
    </ThemeProvider>
  );
};
export default App;
