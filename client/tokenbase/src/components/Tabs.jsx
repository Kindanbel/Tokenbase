const Tabs = (prop) => {
  return (
    <div
      onClick={prop.onClick}
      className="p-10 border-2 border-solid border-[rgba(0,0,0,0.25)] 
      flex flex-col gap-10 rounded-lg w-[400px] max-w-[100%] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]
       transition-all duration-500"
    >
      <div className="header text-[20px] font-[500] text-[rgba(0,0,0,0.55)]">
        Import a <span className=" text-[rgba(0,0,0)]">{prop.text}</span>
      </div>
      <div className="text text-[18px] font-[500] text-[rgba(0,0,0,0.55)]">
        {prop.paragraph}
      </div>
    </div>
  );
};

export default Tabs;
