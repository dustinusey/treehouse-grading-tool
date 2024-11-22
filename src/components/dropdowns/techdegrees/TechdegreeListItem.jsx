import { useContext } from "react";
import { AppState } from "../../../App";
import logo from "../../../assets/thlogo.png";

const TechdegreeListItem = ({ td, setOpenDropdown, setShowProjects }) => {
  const { setActiveTechdegree } = useContext(AppState);
  return (
    <li
      onClick={() => {
        setActiveTechdegree(td), setOpenDropdown(false), setShowProjects(true);
      }}
      className="px-5 py-2 flex items-center justify-start hover:bg-white hover:bg-opacity-10 last-of-type:pb-3 hover:pl-7 duration-200"
    >
      <div
        style={{ backgroundColor: td.color }}
        className="rounded-xl w-[40px] h-[40px] grid place-items-center mr-4"
      >
        <img className="w-[25px]" src={logo} alt="Treehouse Logo" />
      </div>
      <p>{td.name}</p>
    </li>
  );
};
export default TechdegreeListItem;
