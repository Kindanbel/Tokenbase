import Button from "../../../components/Button";
import DesignFinder from "../../../api/DesignFinder";
import { useContext } from "react";
import { DesignContext } from "../../../context/DesignContext";

const FontWeight = (prop) => {

  const {tokens, setTokens} = useContext(DesignContext)

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
        <div>
          <select
            name="control"
            id="control"
            className="w-[230px] border-2 border-solid border-black p-3 rounded-lg cursor-pointer"
            value={prop.control}
            onChange={(e) => prop.setControl(e.target.value)}
          >
            <option>Weight</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
          </select>
        </div>

        <div className="btn flex gap-3 items-center">
          <Button btn="Update" onClick={handleUpdate}/>
          <Button btn="Delete" onClick={() => handleDelele(prop.id)}/>
        </div>
      </form>
    </div>
  );
};

export default FontWeight;
