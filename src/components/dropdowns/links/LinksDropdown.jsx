import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import LinkListItem from "./LinkListItem";
const links = [
  {
    title: "HTML Validator",
    url: "https://validator.w3.org/#validate_by_input",
  },
  {
    title: "CSS Validator",
    url: "https://jigsaw.w3.org/css-validator/#validate_by_input",
  },
  {
    title: "JavaScript Validator",
    url: "https://jshint.com/",
  },
];

const LinksDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="w-full rounded-2xl bg-zinc-950 hover:bg-zinc-900 cursor-pointer duration-200 overflow-hidden">
      {/* dropdown header */}
      <div
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
        className="flex items-center justify-between px-4 py-4"
      >
        <div className="w-[50px] h-[50px] rounded-xl bg-[#F4AA52] grid place-items-center mr-3 text-3xl">
          <FaLink />
        </div>
        <div>
          <p className="font-bold">Your Links</p>
          <p className="text-sm opacity-50">Code validator links</p>
        </div>
        <button
          className={`${
            openDropdown && "rotate-180"
          } rounded-lg p-3 text-xl duration-200 ml-auto`}
        >
          <IoChevronDown />
        </button>
      </div>

      {/* menu */}
      <ul
        className={`${openDropdown ? "h-auto" : "h-[0px]"} w-full duration-200`}
      >
        {links.map((link, index) => {
          return <LinkListItem key={index} link={link} />;
        })}
      </ul>
    </div>
  );
};
export default LinksDropdown;
