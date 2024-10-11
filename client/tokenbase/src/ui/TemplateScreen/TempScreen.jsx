import PopTab from "../../components/SubCom/PopTab";

const TempScreen = () => {
  return (
    <div className="py-[50px] px-[7%]">
      <div className="header flex flex-col gap-2">
        <span className="text-[25px] font-[500]">Token Templates</span>
        <span className="parageph text-[16px] font-[500] text-[rgba(0,0,0,0.55)]">
          Collection of Tokens to import into your groups.
        </span>
      </div>
      <div className="tabs mt-10 grid grid-cols-2 grid-rows-1 gap-5">
        <PopTab
          text="Tailwind Colors"
          paragraph="Slate color palette from Tailwind CSS."
          inner="Token template"
        />
      </div>
    </div>
  );
};

export default TempScreen;
