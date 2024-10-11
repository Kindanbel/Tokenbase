// src/components/ColorAnalyzer.js
import { useState, useContext } from 'react';
import chroma from 'chroma-js';
import Button from '../../../components/Button';
import DesignFinder from '../../../api/DesignFinder';
import { DesignContext } from '../../../context/DesignContext';

const Color = (prop) => {
  const [hue, setHue] = useState(0);
  const [chromaLevel, setChromaLevel] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const {tokens, setTokens} = useContext(DesignContext)

  //const [isValidHex, setIsValidHex] = useState(true);


  //Updating the color controls and name
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

  // Function to update the sliders and hex code when a valid hex is input
  const handleHexChange = (e) => {
    const hex = e.target.value;
    prop.setControl(hex);

    if (chroma.valid(hex)) {
      const color = chroma(hex);
      setHue(color.get('hsl.h') || 0);
      setChromaLevel(color.get('hsl.c') || 0);
      setSaturation((color.get('hsl.s') * 100) || 0);
      
    } else {
      console.log(false)
    }
  };

  // Function to update the hex code when sliders are adjusted
  const updateHexFromSliders = (newHue, newChroma, newSaturation) => {
    const newColor = chroma.hsl(newHue, newSaturation / 100, newChroma);
    const newHex = newColor.hex();
    prop.setControl(newHex);
  };

  // Handlers for slider changes
  const handleHueChange = (e) => {
    const newHue = e.target.value;
    setHue(newHue);
    updateHexFromSliders(newHue, chromaLevel, saturation);
  };

  const handleChromaChange = (e) => {
    const newChroma = e.target.value;
    setChromaLevel(newChroma);
    updateHexFromSliders(hue, newChroma, saturation);
  };

  const handleSaturationChange = (e) => {
    const newSaturation = e.target.value;
    setSaturation(newSaturation);
    updateHexFromSliders(hue, chromaLevel, newSaturation);
  };

  return (
    <form className='flex items-center gap-3 relative mb-[50px]'>
      <input
        type="text"
        name="control"
        value={prop.control}
        onChange={handleHexChange}
        className='border-2 border-solid border-black p-2 rounded-lg'
      />

      <div>
        <p>Hue: {Number(hue).toFixed(2)}</p>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={handleHueChange}
        />
      </div>
      <div>
        <p>Chroma: {Number(chromaLevel).toFixed(2)}</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={chromaLevel}
          onChange={handleChromaChange}
        />
      </div>
      <div>
        <p>Saturation: {Number(saturation).toFixed(1)}%</p>
        <input
          type="range"
          min="0"
          max="100"
          value={saturation}
          onChange={handleSaturationChange}
        />
      </div>

      <div className="btn flex gap-3 items-center absolute left-[280px] top-[60px]">
          <Button btn="Update" onClick={handleUpdate}/>
          <Button btn="Delete" onClick={() => handleDelele(prop.id)}/>
        </div>
    </form>
  );
};

export default Color;
