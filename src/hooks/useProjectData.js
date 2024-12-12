import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProjectData() {
  const [allTechdegrees, setAllTechdegrees] = useState([]);
  const [allProjects, setAllProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      try {
        setIsLoading(true);
        const response = await axios.get(`https://supw1mz3.api.sanity.io/v2021-10-21/data/query/production?query=${ALL_DATA_QUERY}`);
        const result = response.data.result;

        setAllTechdegrees(result);
        const allProjects = result.flatMap((td) =>
          td.projects.map((project) => ({
            ...project,
            tdName: td.name,
          }))
        );
        setAllProjects(allProjects);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return { allTechdegrees, allProjects, isLoading, error };
} 
