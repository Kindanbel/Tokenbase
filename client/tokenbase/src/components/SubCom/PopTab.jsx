import { MdToken } from "react-icons/md";

const PopTab = (prop) => {
  return (
    <div
      className="py-7 px-10  border-2 border-solid border-[rgba(0,0,0,0.25)] 
    flex flex-col gap-5 rounded-lg w-[100%] max-w-[100%] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]
     transition-all duration-500"
    >
      <div className="header text-[20px] font-[500] ">
        {prop.text}
        <div className="text-[15px] text-[rgba(0,0,0,0.55)] flex items-center gap-2 pt-1">  <MdToken />{prop.inner}</div>
      </div>
      <div className="text text-[18px] font-[500] text-[rgba(0,0,0,0.55)] mt-2">
        {prop.paragraph}
      </div>

      <div className="person mt-5 flex items-center gap-5">
        <img src="/images/falco.jpg" alt="img" className="w-[30px] h-[30px] rounded-full"/>
        <span className="font-[500]">Ape Falco</span>
      </div>
    </div>
  );
};

export default PopTab;
