import { FaRegObjectGroup } from "react-icons/fa";
import { RiTokenSwapLine } from "react-icons/ri";
import GroupTem from "../GroupTem/GroupTem";
import TempScreen from "../TemplateScreen/TempScreen";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";


const PopScreen = (prop) => {
  const [activeTemp, setActiveTemp] = useState("Group");

  if (!prop.isVisible) return null;

  return (
    <div className=" mx-[5%] my-[20px] h-[93vh] text-black rounded-xl bg-white relative flex">
      <div className="sidebar w-[350px] bg-gray-100 h-full rounded-l-xl rounded-bl-xl py-[50px] px-[2%]">
        <div className="header font-[500] text-[20px] mb-7">
          Templates Explorer
        </div>
        <div className="link">
          <div className="header text-[rgba(0,0,0,0.35)] text-[15px] mb-3">
            Types
          </div>
          <div className="btn flex flex-col gap-3">
            <button
              onClick={() => setActiveTemp("Group")}
              className="flex items-center gap-3 p-2 hover:border-solid hover:border-2
             hover:border-[rgba(0,0,0,0.35)] hover:bg-[rgba(0,0,0,0.05)] rounded-lg "
            >
              <span>
                <FaRegObjectGroup />
              </span>
              <span className=" font-[500] text-[18px] ">Group Templates</span>
            </button>

            <button
              onClick={() => setActiveTemp("Token")}
              className="flex items-center gap-3 p-2 hover:border-solid hover:border-2
             hover:border-[rgba(0,0,0,0.35)] hover:bg-[rgba(0,0,0,0.05)] rounded-lg "
            >
              <span>
                <RiTokenSwapLine />
              </span>
              <span className=" font-[500] text-[18px] ">Token Templates</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mainpage flex-1">
        {activeTemp === "Group" && <GroupTem />}
        {activeTemp === "Token" && <TempScreen />}

        <button
          onClick={prop.onClose}
          className="absolute top-0 right-4 text-xl cursor-pointer pt-5"
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default PopScreen;
