import { useContext, useState } from "react";
import { MdToken } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeBold } from "react-icons/pi";
import { DesignContext } from "../../context/DesignContext";
import DesignFinder from "../../api/DesignFinder";

const GSidebar = (prop) => {
  const [isClicked, setIsClicked] = useState(null);
  const [isClicked2, setIsClicked2] = useState(null);
  const { groups, setGroup } = useContext(DesignContext);
  const navigate = useNavigate();

  //Function for the group drop down
  function handleGroupClick(id) {
    // Toggle the clicked group
    if (isClicked === id) {
      setIsClicked(null); // Unset if the same group is clicked again
    } else {
      setIsClicked(id); // Set the new group ID
    }
  }

  //Function for the group option to delete group or add a new group
  function handleGroupClick2(id) {
    // Toggle the clicked group
    if (isClicked2 === id) {
      setIsClicked2(null); // Unset if the same group is clicked again
    } else {
      setIsClicked2(id); // Set the new group ID
    }
  }


  //Route function to delete a group and all the tokens that are relating to that group
  const handleGroupDelete = async (id) => {
    try {
      const response = await DesignFinder.delete(`/group/${id}`);
      setGroup(
        groups.filter((group) => {
          return group.id !== id;
        })
      );
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  //Function to navigate to a specific group to see all the tokens or add more
  function handleRouting(id) {
    navigate(`group/${prop.designId}/${id}`);
  }

  //Function to navigate back to home page
  function handleRoutig2() {
    navigate("/");
  }

  return (
    <div className="py-5 px-10 bg-gray-100 h-[100vh] w-[300px]">
      <div className="logo mb-5">
        <div onClick={handleRoutig2} className="logo flex items-center gap-2 cursor-pointer">
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

      {/*Groupp logs*/}

      {prop.group.map((item) => {
        return (
          <div
            key={item.id}
            className="group-con border-b-2 border-solid border-[rgba(0,0,0,0.15)] pb-3 mb-5 relative"
          >
            <div className="groups flex items-center gap-2 mb-3">
              <div className="groupicon">
                <SlArrowRight
                  onClick={() => handleGroupClick(item.id)}
                  className={`text-[15px] ${
                    isClicked === item.id ? "transform rotate-90" : ""
                  } transition-all duration-500 cursor-pointer`}
                />
              </div>
              <form className="groupname text-black font-[500] text-[17px] cursor-pointer w-[100%] flex items-center justify-between ">
                <div onClick={() => handleRouting(item.id)} className="name">
                  {item.group_name}
                </div>

                <div className="icon  relative">
                  <PiDotsThreeBold
                    onClick={() => handleGroupClick2(item.id)}
                    className="text-[20px]"
                  />
                </div>
              </form>
            </div>
            <div
              className={` ${
                isClicked2 === item.id ? "block" : "hidden"
              } options absolute top-[30px] -right-20 bg-black
             text-white p-3 w-[150px] flex flex-col items-center justify-center rounded-md`}
            >
              <div className="update cursor-pointer pb-3">Add a group</div>
              <div
                onClick={() => handleGroupDelete(item.id)}
                className="delete cursor-pointer"
              >
                Delete a group
              </div>
            </div>
            <div
              className={`${
                isClicked === item.id ? "block" : "hidden"
              } children font-[500] text-[14px] text-[rgba(0,0,0,0.35)] `}
            >
              Group has no children stored.
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GSidebar;
