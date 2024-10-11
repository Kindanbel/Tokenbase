import { useState } from "react";
import CreateHeader from "../../components/SubCom/CreateHeader";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import DesignFinder from "../../api/DesignFinder";
import { Link, useNavigate } from "react-router-dom";

const CreateScreen = () => {
  const [designName, setDesignName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  let navigate = useNavigate();

  const handleTextChange = (e) => {
    let name = e.target.value;

    setDesignName(name);

    if (name.length > 0) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await DesignFinder.post("/design", {
        design_title: designName,
      });

      if (response.data.status === "Success") {
        const { id, design_title } = response.data.data.design;
        navigate(`/main/${id}/${encodeURIComponent(design_title)}`);
      } else if (response.data.status === "Error") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CreateHeader />
      <div className="flex-1 h-[85vh] ">
        <div className="body flex h-[70vh] items-center justify-center flex-col gap-7">
          <div className="header text-black text-[20px] font-[500]">
            Enter the name of your Design System
          </div>
          <div className="input relative">
            <form>
              <input
                type="text"
                name="design_title"
                id="design_title"
                className="w-[800px] p-5 rounded-full drop-shadow-lg relative"
                value={designName}
                onChange={handleTextChange}
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="absolute top-[20%] right-10 flex items-center
               py-2 px-5 rounded-full gap-5 hover:bg-gray-100  justify-end"
              >
                <span className={`${isClicked ? "block" : "hidden"}`}>
                  Create
                </span>
                <span>
                  <MdOutlineSubdirectoryArrowLeft />
                </span>
              </button>
            </form>
          </div>
          <div className="login flex flex-col gap-5 items-center">
            <div className="note">
              {" "}
              If you already have a design system name saved, Clcik the link
              below or go ahead to create a new one
            </div>
            <div className="link">
              <Link to="/login" className="font-[600]">Go to Login</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer text-center font-[500]">
        Made by Mateoroldos and eme studio and developed by Devking
      </div>
    </div>
  );
};

export default CreateScreen;
