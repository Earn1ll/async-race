import './UpdateCar.scss';
import React, { useState } from 'react';
import  {PopoverPicker}  from '../../utils/ColorPicker/PopoverPicker';

export default function UpdateCar() {
  const [color, setColor] = useState('#aabbcc');

  const clickHandler = () => {
    console.log('update color: ' + color);
  };

  return (
    <div className="update-car">
      <input type="text" className="choice-name" />
      <div className="choice-color">
        <PopoverPicker color={color} onChange={setColor} />
      </div>
      <button type="button" className="update-button" onClick={clickHandler}>
        Update
      </button>
    </div>
  );
}