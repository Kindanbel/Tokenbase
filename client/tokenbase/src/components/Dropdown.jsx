import { useState } from "react";

const Dropdown = (prop) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (option) => {
    prop.setSelectedOption(option)
    setIsOpen(false);
  };
  return (
    <div className="relative ">
      <div
        className="dropdown-header relative border-2 border-solid border-black w-[200px] p-2 rounded-lg mb-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {prop.selectedOption}
      </div>
      {isOpen && (
        <div className="dropdownlist absolute top-[55px] z-10 bg-black text-white w-[200px] px-2 py-3 rounded-lg cursor-pointer">
          <div onClick={() => handleDropdown("Color")} 
          className="option mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]">
            Color
          </div>
          <div
            onClick={() => handleDropdown("Dimension")}
            className="option1 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Dimension
          </div>
          <div
            onClick={() => handleDropdown("Font Weight")}
            className="option2 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Font Weight
          </div>
          <div
            onClick={() => handleDropdown("Font Family")}
            className="option3 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Font Family
          </div>
          <div
            onClick={() => handleDropdown("Cubic Bezier")}
            className="option4 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Cubic Bezier
          </div>
          <div
            onClick={() => handleDropdown("Duration")}
            className="option5 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Duration
          </div>
          <div
            onClick={() => handleDropdown("Number")}
            className="option6 mb-2 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.25)]"
          >
            Number
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
