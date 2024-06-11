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

const CommandMenu = () => {
  const { setDarkMode, projects, techdegrees, setActiveProject } =
    useContext(AppState);
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const page = pages[pages.length - 1];

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPages([]);
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && pages) {
        e.preventDefault();
        setPages([]);
      }
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyP") {
        e.preventDefault();
        setOpen(true);
        setPages([...pages, "allProjects"]);
      }
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyT") {
        e.preventDefault();
        setOpen(true);
        setPages([...pages, "techdegrees"]);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
                  <CommandShortcut>⌘ + T</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPages([...pages, "allProjects"]);
                    setSearch("");
                  }}
                >
                  Projects...
                  <CommandShortcut>⌘ + P</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem
                  onSelect={() => {
                    setDarkMode((prevState) => !prevState);
                  }}
                >
                  Toggle Dark/Light mode
                </CommandItem>
              </CommandGroup>
              {projects
                ?.sort((a, b) => {
                  if (a.techdegree.abbr < b.techdegree.abbr) return -1;
                  if (a.techdegree.abbr > b.techdegree.abbr) return 1;
                  return 0;
                })
                .map((proj) => (
                  <SubItem
                    key={proj._id}
                    onSelect={() => {
                      setActiveProject(proj);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {`${proj.techdegree.abbr} - ${proj.projectNumber} : ${proj.title}`}
                  </SubItem>
                ))}
            </>
          )}

          {page === "allProjects" && (
            <>
              {projects
                .sort((a, b) => {
                  if (a.techdegree.abbr < b.techdegree.abbr) return -1;
                  if (a.techdegree.abbr > b.techdegree.abbr) return 1;
                  return 0;
                })
                .map((proj) => (
                  <CommandItem
                    key={proj._id}
                    onSelect={() => {
                      setActiveProject(proj);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {proj.techdegree.abbr} - {proj.projectNumber} : {proj.title}
                  </CommandItem>
                ))}
            </>
          )}

          {page?.includes("-projects") && (
            <>
              {projects
                ?.filter((proj) => proj.techdegree.abbr === page.split("-")[0])
                .map((proj) => (
                  <CommandItem
                    key={proj._id}
                    onSelect={() => {
                      setActiveProject(proj);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {proj.techdegree.abbr} - {proj.projectNumber} : {proj.title}
                  </CommandItem>
                ))}
            </>
          )}

          {page === "techdegrees" && (
            <CommandGroup heading="Techdegrees">
              {techdegrees.map((td) => (
                <CommandItem
                  key={td.abbr}
                  onSelect={() => {
                    setPages([...pages, `${td.abbr}-projects`]);
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
