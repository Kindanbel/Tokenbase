import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import DesignFinder from "../../api/DesignFinder";
import { TbDotsDiagonal2 } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";
import { CiSquarePlus } from "react-icons/ci";
import Button from "../../components/Button";
import Gillustration from "./GillusComp/Gillustration";
import { DesignContext } from "../../context/DesignContext";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const GroupDetail = (prop) => {
  const [groupName, setGroupName] = useState("");
  const [theme, setTheme] = useState("light");
  const { id } = useParams();
  const { tokens, setTokens } = useContext(DesignContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedOption] = useState("Color");
  const [name] = useState("Untitled");
  const [control] = useState("#000000");
  const [isClicked, setIsclicked] = useState(false);

  //Fetching group name and tokens associated with the group
  useEffect(() => {
    setTokens([]);
    const fetchData = async () => {
      const response = await DesignFinder.get(`/group/${id}`);
      setGroupName(response.data.data.group.group_name);
      setTokens(response.data.data.token);
      console.log(response.data.data);
    };
    fetchData();
  }, [id]);

  //Adding tokens to a specific group
  const handlePost = async () => {
    try {
      const response = await DesignFinder.post(`/token/${id}`, {
        token_type: selectedOption,
        token_name: name,
        token_control: control,
        group_id: id,
      });
      console.log(response.data.data);

      //Re-fetched tokens after posting it to the tokens array
      const updatedTokens = await DesignFinder.get(`/group/${id}`);
      setTokens(updatedTokens.data.data.token);

      //Getting the message from the backend
      setMessage(response.data.message);

      //Getting the clicked state of the add button
      setIsclicked(!isClicked);
    } catch (err) {
      console.log(err);
    }
  };

  //Making updates to the group name
  const handleGroupUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await DesignFinder.patch(`/group/${id}`, {
        group_name: groupName,
      });
      setGroupName(response.data.data.group.group_name);
    } catch (err) {
      console.log(err);
    }
  };

  //Handling the route back to the main page
  const handleRoute = () => {
    navigate(`/main/${prop.id}/${prop.user}`);
  };

  //Handling setTimeout sequence
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
        setIsclicked(false);
      }, 3000); // Hide message after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="details h-[100vh] py-[20px] overflow-scroll relative">
      <div className="header flex items-center justify-between px-[3%]">
        <div className="logo flex items-center gap-3 cursor-pointer">
          <PiDotsThreeOutlineVerticalLight className="cursor-pointer" />
          <span
            onClick={handleRoute}
            className="designName font-[500] text-[20px]"
          >
            {prop.user}
          </span>
          <form className="group pl-[20px] flex items-center gap-5">
            <input
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              name="group_name"
              id="group_name"
              value={groupName}
              className="p-2 rounded-xl font-[500]"
            />
            <div className="btn">
              <button
                onClick={handleGroupUpdate}
                type="submit"
                className="bg-black"
              >
                <GoPlus className="text-white text-[20px]" />
              </button>
            </div>
          </form>
        </div>
        <div className="component flex items-center gap-5">
          <div className="i flex items-center gap-3">
            <TbDotsDiagonal2 className="text-[20px]" />
            <SlTrash className="text-[20px]" />
          </div>
          <div className="theme flex">
            <span className="bg-[rgba(0,0,0,0.15)] p-2 rounded-l-lg">
              Theme
            </span>
            <form className="">
              <div className="input relative">
                <input
                  type="text"
                  name="theme"
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="py-2 px-4 bg-[rgba(0,0,0,0.25)] rounded-r-lg"
                />
                <button className="absolute top-[10px] right-5 ">
                  <CiSquarePlus className="text-[20px]" />
                </button>
              </div>
            </form>
          </div>
          <div className="btn">
            <Button btn="Add Token" onClick={handlePost} />
          </div>
        </div>
      </div>

      <div
        className={`${
          isClicked ? "block" : "hidden"
        } message w-[200px] h-[50px] bg-black 
      text-white rounded-lg flex items-center justify-center absolute right-[650px] top-[20px]`}
      >
        {message}
      </div>

      <div className="descrition mt-10 grid grid-cols-[60px_250px_250px_100px_300px] py-3 px-[3%] bg-gray-200">
        <div className="check">
          <input
            type="checkbox"
            name="check_box"
            id="check_box"
            className="check w-[20px] h-[20px]"
          />
        </div>
        <div className="type">Type</div>
        <div className="name">Name</div>
        <div className="tools">Tools</div>
        <div className="controls">Controls</div>
      </div>

      {tokens.map((items) => {
        return (
          <Gillustration
            key={items.id}
            id={items.id}
            option={items.token_type}
            tokenName={items.token_name}
            tokenControl={items.token_control}
            setMessage={setMessage}
            isClicked={isClicked}
            setIsClicked={setIsclicked}
          />
        );
      })}
    </div>
  );
};

export default GroupDetail;
