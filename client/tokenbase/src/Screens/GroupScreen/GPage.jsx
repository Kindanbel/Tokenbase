import { useState } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import Tabs from "../../components/Tabs";
import DesignFinder from "../../api/DesignFinder";
import Button from "../../components/Button";

const GPage = (prop) => {
  const [groupName] = useState("Untitled");

    const handleSubmitBtn = async (e) => {
    e.preventDefault()

    try {
      const response = await DesignFinder.post(`/${prop.id}/addgroup`, {
        group_name: groupName,
        design_id: prop.id
      });

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="py-5 px-[2%]">
      <div className="header flex items-center gap-3 pb-10 cursor-pointer">
        <PiDotsThreeOutlineVerticalLight className="cursor-pointer" />
        <span className="designName font-[500] text-[20px]">{prop.user}</span>
      </div>

      <div className="body flex justify-center flex-col gap-[20px] pt-[10%] pl-[20%]">
        <div className="header">
          <div className="logo flex items-center gap-2 cursor-pointer">
            <span className="logo-text text-black font-bold flex gap-1 items-center text-[25px]">
              Tokenbase{" "}
              <span className="text-[rgba(0,0,0,0.25)] text-[13px] mt-[6px] ">
                BETA
              </span>
            </span>
          </div>

          <div className="subtex text-[rgba(0,0,0,0.45)] font-[500] text-[20px] w-[70%]">
            Creating groups under you <span>Design System </span> helps you organise
            your tokens properly for export. Click the groups on the sidebar or create another one.
          </div>

          <div className="addg mt-7">
          <form>
              <input
                type="text"
                name="group_name"
                id="group_name"
                className="hidden"
              />
              <div className="button w-[25%] pb-10">
                <Button btn="Create new group" onClick={handleSubmitBtn}/>
              </div>
            </form>
          </div>
        </div>
        <div className="tab">
            <div className="header mb-3 text-[20px] font-[500] text-[rgba(0,0,0,0.55)]">
              Or import a template
            </div>
            <div className="tabs-sec flex items-center gap-10">
              <Tabs
                text="Style Dictionary JSON"
                paragraph="Upload a Style Dictionary Compatible JSON."
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default GPage;
