import { useContext, useState } from "react";
import { FaRegClipboard, FaRegFileAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosImages, IoMdOpen } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { SiReaddotcv } from "react-icons/si";
import { AppState } from "../../../App";

const ProjectMediaDropdown = ({ selectedProject }) => {
  const { setCurrentMockup, setActiveOverlay } = useContext(AppState);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [copyToClipboardAnimation, setCopyToClipboardAnimation] =
    useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedProject.studyGuide);
      setCopyToClipboardAnimation(true);
      setTimeout(() => {
        setCopyToClipboardAnimation(false);
      }, 3000);
    } catch (err) {
      alert("Failed to copy: ", err);
    }
  };

  // Convert mockups to an array
  let mockupArray;
  if (selectedProject) {
    mockupArray = Object.entries(selectedProject.mockups)
      .map(([key, value]) => ({ type: key, mock: value })) // Convert to array of objects
      .filter((mockup) => mockup.mock !== null); // Only allow not-null values
  }

  return (
    <div className="w-full rounded-2xl bg-zinc-950 hover:bg-zinc-900 cursor-pointer duration-200 overflow-hidden">
      {/* dropdown header */}
      <div
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
        className="flex items-center justify-between px-4 py-4"
      >
        <div className="w-[50px] h-[50px] rounded-xl bg-[#F45279] grid place-items-center mr-3 text-2xl">
          <FaRegFileAlt />
        </div>
        <div>
          <p className="font-bold">Project Media</p>
          <p className="text-sm opacity-50">Mockups and Study Guides</p>
        </div>
        <button
          className={`${
            openDropdown && "rotate-180"
          } rounded-lg p-3 duration-200 text-xl ml-auto`}
        >
          <IoChevronDown />
        </button>
      </div>

      {/* menu */}
      <ul
        className={`${
          openDropdown ? "h-auto" : "h-[0px]"
        } w-full overflow-hidden`}
      >
        {!selectedProject && (
          <li className="py-5 text-center">No project selected</li>
        )}

        {selectedProject &&
          !mockupArray.length &&
          !selectedProject.studyGuide && (
            <li className="py-5 text-center">
              There is no media for this project
            </li>
          )}

        {selectedProject && mockupArray.length ? (
          mockupArray.map((mockup, index) => {
            return (
              <li
                onClick={() => {
                  setCurrentMockup(mockup.mock);
                  setActiveOverlay(true);
                }}
                className="px-8 py-3 pl-[28px] flex items-center justify-start hover:bg-white hover:bg-opacity-10 last-of-type:pb-4 duration-200"
                key={index}
              >
                {mockup.mock !== null && (
                  <p className="flex justify-between items-center w-full">
                    <span className="text-2xl mr-5">
                      <IoIosImages />
                    </span>
                    {`${mockup.type} mockup`}
                    <button className="ml-auto">
                      <LuEye />
                    </button>
                  </p>
                )}
              </li>
            );
          })
        ) : (
          <></>
        )}

        {selectedProject?.studyGuide && (
          <li className="py-3 pl-[28px] pr-[258px] flex items-center justify-start hover:bg-white hover:bg-opacity-10 last-of-type:pb-4 duration-200">
            <div className="w-[30px] mr-5 text-2xl">
              <SiReaddotcv />
            </div>

            <div className="mr-5 min-w-[185px] w-[185px]">
              <p>Study Guide</p>
              <p className="text-xs text-zinc-500 shorten1">
                {selectedProject.studyGuide}
              </p>
            </div>

            {/* list utility icons */}
            <div className="flex items-center ml-auto gap-4 text-lg text-zinc-300">
              <button title="copy link address" onClick={copyToClipboard}>
                {copyToClipboardAnimation ? (
                  <FaCheck className="text-emerald-500" />
                ) : (
                  <FaRegClipboard />
                )}
              </button>
              <a
                className="text-[20px]"
                target="_blank"
                href={selectedProject.studyGuide}
                title="open link in new window"
                rel="noopener noreferrer" // Added for security when using target="_blank"
              >
                <IoMdOpen />
              </a>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
export default ProjectMediaDropdown;
