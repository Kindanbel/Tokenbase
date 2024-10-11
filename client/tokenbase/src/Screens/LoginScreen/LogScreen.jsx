import CreateHeader from "../../components/SubCom/CreateHeader";
import { useState} from "react"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import DesignFinder from "../../api/DesignFinder";
import { useNavigate } from "react-router-dom";


const LogScreen = () => {
    const [designName, setDesignName] = useState("")
    const [isClicked, setIsClicked] =  useState(false)
    let navigate = useNavigate();
  
    const handleTextChange = (e) => {
        let name = e.target.value;
  
        setDesignName(name)
        
        if (name.length > 0) {
          setIsClicked(true);
        } else  {
          setIsClicked(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await DesignFinder.post("/logindesign" , {
                design_title: designName
            })

            if(response.data.status === "Success") {
                const { id, design_title } = response.data.data.result;
                navigate(`/main/${id}/${encodeURIComponent(design_title)}`);
            }
        } catch (err) {
            console.log(err)
        }
    }


  
  return (
    <div>
      <CreateHeader />
      <div className="flex-1 h-[85vh] ">
        <div className="body flex h-[70vh] items-center justify-center flex-col gap-7">
          <div className="header text-black text-[20px] font-[500]">
            Login with your Design System name
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
              onClick={handleLogin}
                type="submit"
                className="absolute top-[20%] right-10 flex items-center
               py-2 px-5 rounded-full gap-5 hover:bg-gray-100  justify-end"
              >
                <span className={`${isClicked ? "block" : "hidden"}`}>
                  Login
                </span>
                <span>
                  <MdOutlineSubdirectoryArrowLeft />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer text-center font-[500]">
        Made by Mateoroldos and eme studio and developed by Devking
      </div>
    </div>
  );
};

export default LogScreen;
