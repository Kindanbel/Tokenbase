import { GoPlus } from "react-icons/go";

const Button = (prop) => {
  return (
    <div
      onClick={prop.onClick}
      className="py-3 px-10 bg-black rounded-lg flex gap-3 items-center cursor-pointer"
    >
      <div className="icon">
        <GoPlus className="text-white text-[20px]" />
      </div>
      <div className="text text-white">{prop.btn}</div>
    </div>
  );
};

export default Button;
