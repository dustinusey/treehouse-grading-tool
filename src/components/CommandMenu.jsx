import React from "react";
import { Button } from "./ui/button";
import { cn } from "../utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/command";
import { useCommandState } from "cmdk";

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const page = pages[pages.length - 1];

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPages([]);
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && pages) setPages([]);
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
          setPages([]);
        }}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!page && (
            <>
              <CommandItem onSelect={() => setPages([...pages, "techdegrees"])}>
                Open Techdegree
                <CommandShortcut>⌘ + N</CommandShortcut>
              </CommandItem>
              <CommandItem>Change theme...</CommandItem>
              <SubItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                Change theme to dark
              </SubItem>
              <SubItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                Change theme to light
              </SubItem>
            </>
          )}

          {page === "techdegrees" && (
            <>
              <CommandItem>Front End Web Developement</CommandItem>
              <CommandItem>Web Development</CommandItem>
              <CommandItem>FullStack JavaScript</CommandItem>
              <CommandItem>Python</CommandItem>
              <CommandItem>Data Analysis</CommandItem>
              <CommandItem>User Experience Design</CommandItem>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
