import { useState } from "react";
import Dropdown from "../../../components/Dropdown";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoLinkOutline } from "react-icons/io5";
import Color from "./Color";
import Number from "./Number";
import Font from "./Font";
import FontWeight from "./FontWeight";

const Gillustration = (prop) => {
  const [selectedOption, setSelectedOption] = useState(prop.option);
  const [name, setName] = useState(prop.tokenName);
  const [control, setControl] = useState(prop.tokenControl);

  return (
    <div>
      {/*Tokens */}
      <div className="tokens py-[20px] px-[3%] grid grid-cols-[60px_250px_250px_100px_600px] ">
        <div className="check pt-2">
          <input
            type="checkbox"
            name="check_box"
            id="check_box"
            className="check w-[20px] h-[20px] "
          />
        </div>
        <div className="type_name">
          <Dropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="name">
          <input
            type="text"
            name="token_name"
            className="check w-[200px] p-2 border-2 border-solid border-black rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="tool flex pt-2 gap-2">
          <span>
            <HiMenuAlt2 className="w-[30px] h-[30px] text-[30px] p-2 border-2 border-solid border-black rounded-lg" />
          </span>
          <span>
            <IoLinkOutline className="w-[30px] h-[30px] text-[30px] p-2 border-2 border-solid border-black rounded-lg" />
          </span>
        </div>
        <div className="control">
          {selectedOption === "Color" && (
            <Color
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
            />
          )}
          {selectedOption === "Number" && (
            <Number
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
            />
          )}
          {selectedOption === "Duration" && (
            <Number
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
              setMessage={prop.setMessage}
              isClicked={prop.isClicked}
              setIsClicked={prop.setIsclicked}
            />
          )}
          {selectedOption === "Dimension" && (
            <Number
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
            />
          )}
          {selectedOption === "Cubic Bezier" && (
            <Number
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
            />
          )}

          {selectedOption === "Font Family" && (
            <Font
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
              setMessage={prop.setMessage}
              isClicked={prop.isClicked}
              setIsClicked={prop.setIsclicked}
            />
          )}

          {selectedOption === "Font Weight" && (
            <FontWeight
              control={control}
              setControl={setControl}
              name={name}
              selectedOption={selectedOption}
              id={prop.id}
              setMessage={prop.setMessage}
              isClicked={prop.isClicked}
              setIsClicked={prop.setIsclicked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gillustration;
