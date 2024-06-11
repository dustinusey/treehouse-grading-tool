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
  const { darkMode, setDarkMode, projects, techdegrees, setActiveProject } =
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
              {/*
              <CommandItem onSelect={() => setPages([...pages, "techdegrees"])}>
                SubItem Example
                <CommandShortcut>⌘ + N</CommandShortcut>
              </CommandItem>
              */}
              <CommandGroup heading="Techdegrees">
                {techdegrees.map((td) => (
                  <CommandItem
                    key={td.abbr}
                    onSelect={() => {
                      setPages([...pages, td.abbr]);
                      setSearch("");
                    }}
                  >
                    {td.name}
                  </CommandItem>
                ))}
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
            </>
          )}

          {page && (
            <>
              {projects
                ?.filter((proj) => proj.techdegree.abbr === page)
                .map((proj) => (
                  <CommandItem
                    key={proj._id}
                    onSelect={() => {
                      setActiveProject(proj);
                      setOpen(false);
                    }}
                  >
                    {proj.techdegree.abbr} - {proj.projectNumber} : {proj.title}
                  </CommandItem>
                ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
