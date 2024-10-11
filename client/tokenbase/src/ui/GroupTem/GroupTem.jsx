import PopTab from "../../components/SubCom/PopTab";

const GroupTem = () => {
  return (
    <div className="py-[50px] px-[7%]">
      <div className="header flex flex-col gap-2">
        <span className="text-[25px] font-[500]">Group Templates</span>
        <span className="parageph text-[16px] font-[500] text-[rgba(0,0,0,0.55)]">
          Collection of groups to import inside your groups or Desig System.
        </span>
      </div>
      <div className="tabs mt-10 grid grid-cols-2 grid-rows-1 gap-5">
        <PopTab
          text="Material Design Colors"
          paragraph="Color palettes from Material Design."
          inner="Group template"
        />
        <PopTab
          text="Material Design"
          paragraph="Material Design is a design system created by Google."
          inner="Group template"
        />
        <PopTab
          text="Tailwind Colors"
          paragraph="Color palettes from Tailwind CSS."
          inner="Group template"
        />
      </div>
    </div>
  );
};

export default GroupTem;
