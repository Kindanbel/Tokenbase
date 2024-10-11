import Button from "../../../components/Button";
import DesignFinder from "../../../api/DesignFinder";
import { useContext } from "react";
import { DesignContext } from "../../../context/DesignContext";

const Number = (prop) => {

  const {tokens, setTokens} = useContext(DesignContext)

  const handleUpdate = async () => {
    try {
      const response = await DesignFinder.patch(`/token/${prop.id}`, {
        token_type: prop.selectedOption,
        token_name: prop.name,
        token_control: prop.control
      })
      console.log(response.data.data.token)
      prop.setMessage(response.data.message)
      
    } catch (err) {
      console.log(err)
    }

    prop.setIsclicked(!prop.isClicked)
  }

    //this is deleting all token that is not wanted in the list of tokens
    const handleDelele = async (id) => {
      try {
        const response = await DesignFinder.delete(`/token/${id}`);
        setTokens(tokens.filter(token => {
          return token.id !== id
        }));
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div>
      <form className="flex gap-10">
        <input
          type="text"
          name="token_contol"
          id="token"
          className="check w-[400px] p-2 border-2 border-solid border-black rounded-lg"
          value={prop.control}
          onChange={(e) => prop.setControl(e.target.value)}
        />

        <div className="btn flex gap-3 items-center">
          <Button btn="Update" onClick={handleUpdate}/>
          <Button btn="Delete" onClick={() => handleDelele(prop.id)}/>
        </div>
      </form>
    </div>
  );
};

export default Number;
