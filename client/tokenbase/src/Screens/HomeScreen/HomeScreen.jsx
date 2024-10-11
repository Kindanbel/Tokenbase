import { useParams, useNavigate } from "react-router-dom";
//import Tabs from "../../components/Tabs"
import Sidebar from "./Sidebar";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import DesignFinder from "../../api/DesignFinder";
import PopScreen from "../../ui/OurGroupScreen/PopScreen";

const HomeScreen = () => {
  const { id, design_title } = useParams();
  const [groupName] = useState("Untitled");
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  let navigate = useNavigate();

  const handleSubmitBtn = async (e) => {
    e.preventDefault();

    try {
      const response = await DesignFinder.post(`/${id}/addgroup`, {
        group_name: groupName,
        design_id: id,
      });

      if (response.data.status === "Success") {
        const { design_id } = response.data.data.group;
        navigate(`/group/${design_id}`);
      } else if (response.data.status === "Error") {
        navigate("/login");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to navigate back to the groupscreen
  const handleNavigation = () => {
    navigate(`/group/${id}`);
  };

  //Handling pop up screen//
  const handlePopUp = () => {
    setIsVisible(true);
  };

  //Handling setTimeout sequence
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
        setIsClicked(false);
      }, 3000); // Hide message after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="bg-white h-[100vh] flex gap-5 relative">
      <div className="sidebar">
        <Sidebar
          id={id}
          setMessage={setMessage}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      </div>
      <div className="page py-5 flex-1 pr-[2%]">
        <div className="header flex items-center gap-3 pb-10">
          <PiDotsThreeOutlineVerticalLight className="cursor-pointer" />
          <span className="designName font-[500] text-[20px]">
            {design_title}
          </span>
        </div>

        {/* Main Page */}
        <div className="mainpage flex flex-col justify-center h-[85vh] pl-[20%]">
          <div className="design flex gap-3 items-center text-[25px] font-[500] mb-10">
            <span className="designname ">{design_title}</span>
            <span className="text-[rgba(0,0,0,0.25)]">Design System</span>
          </div>

          <div
            className={`${
              isClicked ? "block" : "hidden"
            } message w-[300px] h-[100px] bg-black 
      text-white rounded-lg flex items-center justify-center absolute right-20 top-10`}
          >
            {message}
          </div>

          <div className="creategroup">
            <form>
              <div className="tex text-[rgba(0,0,0,0.55)] text-[20px] mb-5 font-[500]">
                Create an empty group
              </div>
              <input
                type="text"
                name="group_name"
                id="group_name"
                className="hidden"
              />
              <div className="button w-[20%] pb-10">
                <Button btn="Create group" onClick={handleSubmitBtn} />
              </div>
            </form>
            <div className="group_btn">
              <div className="button w-[25%] pb-10">
                <Button btn="Saved Groups" onClick={handleNavigation} />
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="header mb-3 text-[20px] font-[500] text-[rgba(0,0,0,0.55)]">
              Or import a template
            </div>
            <div className="tabs-sec flex items-center gap-10">
              <Tabs
                onClick={handlePopUp}
                text="Design System Template"
                paragraph="Explore our curated list of Design Systems"
              />
              <Tabs
                text="Style Dictionary JSON"
                paragraph="Upload a Style Dictionary Compatible JSON."
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isVisible
            ? "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
            : ""
        }`}
      >
        <PopScreen isVisible={isVisible} onClose={() => setIsVisible(false)} />
      </div>
    </div>
  );
};

export default HomeScreen;
