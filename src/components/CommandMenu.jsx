import { useState, useEffect, useContext } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
  CommandShortcut,
} from "./ui/command";
import { useCommandState } from "cmdk";
import { AppState } from "../App";

const CommandMenu = ({ copyToClipboard }) => {
  const {
    setDarkMode,
    allProjects,
    allTechdegrees,
    setActiveTechdegree,
    activeProject,
    setActiveProject,
    setAnsweredCount,
    setActiveProjectIndex,
    setActiveProjectQuestions,
    setGradedCorrect,
    setGradedQuestioned,
    setGradedWrong,
  } = useContext(AppState);
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const page = pages[pages.length - 1];

  console.log("this is being rendered");

  const resetProjectState = () => {
    setAnsweredCount(0);
    setActiveProject(null);
    setActiveProjectIndex(null);
    setActiveProjectQuestions(null);
    setGradedCorrect([]);
    setGradedQuestioned([]);
    setGradedWrong([]);
  };

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPages([]);
        setOpen((open) => !open);
      }
      if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
        e.preventDefault();
        setPages((pages) => pages.slice(0, -1));
      }
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyP") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setPages(["allProjects"]);
        } else if (open && pages[0] !== "allProjects") {
          setPages(["allProjects"]);
        } else if (open && pages[0] === "allProjects") {
          setOpen(false);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyT") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setPages(["techdegrees"]);
        } else if (open && pages[0] !== "techdegrees") {
          setPages(["techdegrees"]);
        } else if (open && pages[0] === "techdegrees") {
          setOpen(false);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyC") {
        e.preventDefault();
        copyToClipboard();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, pages]);

  const SubItem = (props) => {
    const search = useCommandState((state) => state.search);
    if (!search) return null;
    return <CommandItem {...props} />;
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className={`bg-zinc-700 text-white cursor-pointer size-[40px] grid place-items-center rounded-md`}
      >
        🔍
      </button>
      <CommandDialog
        open={open}
        onOpenChange={() => {
          setOpen((open) => !open);
          setSearch("");
          setPages([]);
        }}
      >
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!page && (
            <>
              <CommandGroup heading="Search">
                <CommandItem
                  onSelect={() => {
                    setPages([...pages, "techdegrees"]);
                    setSearch("");
                  }}
                >
                  Techdegrees...
                  <CommandShortcut>⌃ + T</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPages([...pages, "allProjects"]);
                    setSearch("");
                  }}
                >
                  Projects...
                  <CommandShortcut>⌃ + P</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Shortcuts">
                {activeProject && (
                  <CommandItem
                    onSelect={() => {
                      copyToClipboard();
                      setOpen(false);
                    }}
                  >
                    Copy Review
                    <CommandShortcut>⌃ + C</CommandShortcut>
                  </CommandItem>
                )}

                <CommandItem
                  onSelect={() => {
                    setDarkMode((prevState) => !prevState);
                  }}
                >
                  Toggle Dark/Light mode
                </CommandItem>
              </CommandGroup>
              {allProjects
                ?.sort((a, b) => {
                  if (a.tdName < b.tdName) return -1;
                  if (a.tdName > b.tdName) return 1;
                  return 0;
                })
                .map((proj) => (
                  <SubItem
                    key={proj._id}
                    onSelect={() => {
                      resetProjectState();
                      setActiveProject(proj);
                      setActiveTechdegree(
                        allTechdegrees.find((t) => t.name === proj.tdName)
                      );
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {`${proj.tdName} - ${proj.projectNumber} : ${proj.title}`}
                  </SubItem>
                ))}
            </>
          )}

          {page === "allProjects" && (
            <>
              {allProjects
                .sort((a, b) => {
                  if (a.tdName < b.tdName) return -1;
                  if (a.tdName > b.tdName) return 1;
                  return 0;
                })
                .map((proj) => (
                  <CommandItem
                    key={proj._id}
                    onSelect={() => {
                      resetProjectState();
                      setActiveProject(proj);
                      setActiveTechdegree(
                        allTechdegrees.find((t) => t.name === proj.tdName)
                      );
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {proj.tdName} - {proj.projectNumber} : {proj.title}
                  </CommandItem>
                ))}
            </>
          )}

          {page?.includes("-projects") && (
            <>
              {allProjects
                ?.filter((proj) => {
                  const td = allTechdegrees.find((t) => t.name === proj.tdName);
                  return td?.name === page.split("-")[0];
                })
                .map((proj) => (
                  <CommandItem
                    key={proj._id}
                    onSelect={() => {
                      resetProjectState();
                      setActiveProject(proj);
                      setActiveTechdegree(
                        allTechdegrees.find((t) => t.name === proj.tdName)
                      );
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {proj.tdName} - {proj.projectNumber} : {proj.title}
                  </CommandItem>
                ))}
            </>
          )}

          {page === "techdegrees" && (
            <CommandGroup heading="Techdegrees">
              {allTechdegrees.map((td) => (
                <CommandItem
                  key={td._id}
                  onSelect={() => {
                    setPages([...pages, `${td.name}-projects`]);
                    setSearch("");
                  }}
                >
                  {td.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
