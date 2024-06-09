import Requirement from "./Requirement";

const GradingSection = ({ index, question }) => {
  return (
    <li className=" bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-5 last-of-type:mb-0 duration-200 slideInBigDawg">
      {/* header */}
      <div className="my-3 p-8 pb-5 pl-10 sticky z-10 top-[220px] bg-zinc-200 dark:bg-zinc-900 rounded-tr-xl rounded-tl-xl duration-200">
        <p className="text-2xl font-bold">
          <span className="mr-2">{index + 1}.</span> {question.title}
        </p>
      </div>

      {/* individual requirements */}
      <ul className="overflow-hidden">
        {question.requirements.map((req, index) => {
          return <Requirement key={index} index={index} req={req} />;
        })}
      </ul>
    </li>
  );
};
export default GradingSection;
