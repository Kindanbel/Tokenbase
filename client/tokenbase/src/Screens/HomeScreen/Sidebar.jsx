import { MdToken } from "react-icons/md";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import DesignFinder from "../../api/DesignFinder";
import { useNavigate } from "react-router-dom";

const Sidebar = (prop) => {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const id = prop.id;

  //Function setting the groupname
  const handleTextChange = (e) => {
    const name = e.target.value;
    setGroupName(name);
  };

  //Function handling the posting of a group to the groups array
  const handleSubmitBtn = async (e) => {
    e.preventDefault();

    try {
      const response = await DesignFinder.post(`/${id}/addgroup`, {
        group_name: groupName,
        design_id: id,
      });
      
      //setting the message for adding a group
      prop.setMessage(response.data.message)

    } catch (err) {
      console.log(err);
    }

    setGroupName("");

    //catching the eventlistener for the button
    prop.setIsClicked(!prop.isClicked);
  };

  //function handling navigating to the home page
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="py-5 px-10 bg-gray-100 h-[100vh] w-[300px] relative">
      <div className="logo mb-10">
        <div
          onClick={handleHome}
          className="logo flex items-center gap-2 cursor-pointer"
        >
          <span className="icon">
            <MdToken className="text-[30px]" />
          </span>
          <span className="logo-text text-black font-bold flex gap-1 items-center text-[20px]">
            Tokenbase{" "}
            <span className="text-[rgba(0,0,0,0.25)] text-[13px] mt-[6px] ">
              BETA
            </span>
          </span>
        </div>
      </div>
      <div className="addgroup">
        <form>
          <input
            type="text"
            name="group_name"
            id="group_name"
            placeholder="Add a new group to start."
            className="bg-transparent outline-none border-b-2 border-solid py-3 text-lg mb-5"
            value={groupName}
            onChange={handleTextChange}
          />
          <button
            onClick={handleSubmitBtn}
            type="submit"
            className="flex items-center gap-3 text-[rgba(0,0,0,0.65)]font-[500]"
          >
            <GoPlus className="text-[20px]" />{" "}
            <span className="">New group</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
