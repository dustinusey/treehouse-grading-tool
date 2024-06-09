import { FaRegClipboard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMdOpen } from "react-icons/io";

import { useState } from "react";

const LinkListItem = ({ link }) => {
  const [copyToClipboardAnimation, setCopyToClipboardAnimation] =
    useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopyToClipboardAnimation(true);
      setTimeout(() => {
        setCopyToClipboardAnimation(false);
      }, 3000);
    } catch (err) {
      alert("Failed to copy: ", err);
    }
  };

  return (
    <li className="py-3 pl-[28px] pr-[28px] flex items-center justify-start hover:bg-white hover:bg-opacity-10 last-of-type:pb-4 duration-200">
      <div className="mr-5 max-w-[70%]">
        <p>{link.title}</p>
        <p className="text-xs text-zinc-500 shorten1">{link.url}</p>
      </div>
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
          href={link.url}
          title="open link in new window"
          rel="noopener noreferrer" // Added for security when using target="_blank"
        >
          <IoMdOpen />
        </a>
      </div>
    </li>
  );
};
export default LinkListItem;
