import { createContext, useContext } from 'react';
import { useProjectData } from '../hooks/useProjectData';

const ProjectDataContext = createContext();

export function ProjectDataProvider({ children }) {
  const { allTechdegrees, allProjects, isLoading, error } = useProjectData();

  return (
    <ProjectDataContext.Provider value={{ allTechdegrees, allProjects, isLoading, error }}>
      {children}
    </ProjectDataContext.Provider>
  );
}

export function useProjectDataContext() {
  return useContext(ProjectDataContext);
}
