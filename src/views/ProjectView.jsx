import ProjectHeader from "../components/ProjectHeader";
import ProjectRequirements from "../components/ProjectRequirements";
import ProjectUtilityButtons from "../components/ProjectUtilityButtons";

const ProjectView = () => {
  return (
    <div className="h-full overflow-auto project-view text-zinc-700 dark:text-white">
      <div className="sticky top-0 bg-white z-20 dark:bg-[#45454B]">
        <ProjectHeader />
        <ProjectUtilityButtons />
      </div>
      <div className="">
        <ProjectRequirements />
      </div>
    </div>
  );
};
export default ProjectView;
