import { useContext } from "react";
import { AppState } from "../../../App";

const TechdegreeListItem = ({ td, color, title, setOpenDropdown }) => {
  const { logo, setActiveTechdegree, setShowProjects } = useContext(AppState);
  return (
    <li
      onClick={() => {
        setActiveTechdegree(td), setOpenDropdown(false), setShowProjects(true);
      }}
      className="px-5 py-2 flex items-center justify-start hover:bg-white hover:bg-opacity-10 last-of-type:pb-3 hover:pl-7 duration-200"
    >
      <div
        style={{ backgroundColor: color }}
        className="rounded-xl w-[40px] h-[40px] grid place-items-center mr-4"
      >
        <img className="w-[25px]" src={logo} alt="" />
      </div>
      <p>{title}</p>
    </li>
  );
};
export default TechdegreeListItem;
