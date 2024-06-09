const DefaultView = () => {
  return (
    <div className="h-full overflow-hidden p-10 opacity-50">
      <div role="status" className="animate-pulse w-full">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-500 rounded-full w-[65%] mb-4"></div>
        <div className="flex gap-5">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-500 rounded-full w-[15%] mb-4"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-500 rounded-full w-[15%] mb-4"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-500 rounded-full w-[7%] mb-4 ml-auto"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-500 rounded-full w-[15%] mb-4"></div>
        </div>

        <div className="h-[300px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5 mt-10"></div>
        <div className="h-[50px] bg-zinc-200 dark:bg-zinc-500 rounded-2xl w-full mb-5"></div>
        <div className="h-[50px] bg-zinc-200 dark:bg-zinc-500 rounded-2xl w-full mb-5"></div>
        <div className="h-[400px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5"></div>
        <div className="h-[400px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5"></div>

        <div className="h-[300px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5 mt-10"></div>
        <div className="h-[50px] bg-zinc-200 dark:bg-zinc-500 rounded-2xl w-full mb-5"></div>
        <div className="h-[50px] bg-zinc-200 dark:bg-zinc-500 rounded-2xl w-full mb-5"></div>
        <div className="h-[400px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5"></div>
        <div className="h-[400px] bg-zinc-200 dark:bg-zinc-500 rounded-3xl w-full mb-5"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default DefaultView;
