import { useContext } from "react";
import DesignFinder from "../../../api/DesignFinder";
import Button from "../../../components/Button";
import { DesignContext } from "../../../context/DesignContext";


const Font = (prop) => {

  const {tokens, setTokens} = useContext(DesignContext);



  const handleUpdate = async () => {
    try {
      const response = await DesignFinder.patch(`/token/${prop.id}`, {
        token_type: prop.selectedOption,
        token_name: prop.name,
        token_control: prop.control
      })
      console.log(response.data.data.token)
    } catch (err) {
      console.log(err)
    }
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
        <select
          name="control"
          id="control"
          className="w-[300px] flex-1 border-2 border-solid border-black p-2 rounded-lg cursor-pointer"
          value={prop.control}
          onChange={(e) => prop.setControl(e.target.value)}
        >
          <option>Fonts</option>
          <option value="San-serif">San-serif</option>
          <option value="Serif">Serif</option>
          <option value="Cursive">Cursive</option>
          <option value="Monospace">Monospace</option>
        </select>

        <div className="btn flex gap-3 items-center">
          <Button btn="Update" onClick={handleUpdate}/>
          <Button btn="Delete" onClick={() => handleDelele(prop.id)}/>
        </div>
      </form>
    </div>
  );
};

export default Font;
