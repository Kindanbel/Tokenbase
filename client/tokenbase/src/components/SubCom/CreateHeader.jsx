import { MdToken } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import { AiOutlineDiscord } from "react-icons/ai";

const CreateHeader = () => {
  return (
    <div className="flex px-[5%] py-5 items-center justify-between bg-white">
      <div className="logo flex items-center gap-2 cursor-pointer">
        <span className="icon">
          <MdToken className="text-[30px]"/>
        </span>
        <span className="logo-text text-black font-bold flex gap-1 items-center text-[20px]">
          Tokenbase <span className="text-[rgba(0,0,0,0.25)] text-[13px] mt-[6px] ">BETA</span>
        </span>
      </div>
      <div className="icons flex items-center gap-5">
        <FiGithub className="text-[20px] cursor-pointer"/>
        <AiOutlineDiscord className="text-[20px] cursor-pointer"/>
      </div>
    </div>
  );
};

export default CreateHeader;
