import './Car.scss';
import ColorPicker from '../utils/colorPicker';
import React, { useState } from 'react';
import { PopoverPicker } from '../utils/ColorPick/PopoverPicker';

export default function CreateCar() {
  const [color, setColor] = useState('#ccbbaa');

  const clickHandler = () => {
    console.log('create color: ' + color);
  };
    return (
      <div className="create-car">
        <input type="text" className="choice-name" />
        <div className="create-choice-color">
        <PopoverPicker color={color} onChange={setColor} />
      </div>
      <button type="button" className="create-button" onClick={clickHandler}>
          Create
        </button>
      </div>
    );
  }