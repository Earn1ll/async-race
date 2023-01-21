import './Car.scss';
import React, { useState } from 'react';
import { PopoverPicker } from '../utils/ColorPicker/PopoverPicker';

export default function CreateCar(props: { clickHandler: (arg0: string, arg1: string) => void }) {
  const [color, setColor] = useState('#ccbbaa');
  const [inputValue, setInput] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
    return (
      <div className="create-car">
        <input placeholder="choose name" type="text" className="choice-name" onChange={inputHandler} />
        <div className="create-choice-color">
        <PopoverPicker color={color} onChange={setColor} />
      </div>
      <button type="button" className="create-button" onClick={() => props.clickHandler(color, inputValue)}>
          Create
        </button>
      </div>
    );
  }