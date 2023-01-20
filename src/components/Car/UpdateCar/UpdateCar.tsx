import './update-car.scss';
import React, { useState } from 'react';
import  {PopoverPicker}  from '../../utils/ColorPick/PopoverPicker';

export default function UpdateCar() {
  const [color, setColor] = useState('#aabbcc');

  return (
    <div className="update-car">
      <input type="text" className="choice-name" />
      <div className="choice-color">
        <PopoverPicker color={color} onChange={setColor} />
      </div>
      <button type="button" className="update-button">
        Update
      </button>
    </div>
  );
}