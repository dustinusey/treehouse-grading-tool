const ProjectUtilityButtons = () => {
  const buttonClasses =
    "bg-zinc-100 hover:bg-zinc-200 dark:bg-black dark:bg-opacity-20 dark:text-zinc-200 dark:hover:bg-zinc-900 duration-200 rounded-lg px-5 py-4";
  return (
    <div className="px-5 py-8 flex items-center gap-2">
      <button className={buttonClasses}>Mark all correct</button>
      <button className={buttonClasses}>Exclude Exceeds</button>
    </div>
  );
};
export default ProjectUtilityButtons;
