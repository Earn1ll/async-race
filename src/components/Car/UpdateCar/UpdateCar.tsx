import './UpdateCar.scss';
import {useEffect,useState } from 'react';
import  {PopoverPicker}  from '../../utils/ColorPicker/PopoverPicker';

export default function UpdateCar(props: { name: string; color: string; clickHandler: (arg0: string, arg1: string) => void }) {
  const [color, setColor] = useState('#aabbcc');
  const [inputValue, setInput] = useState('');

  useEffect(() => {
    setInput(props.name);
    setColor(props.color);
  }, [props.name, props.color]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="update-car">
      <input type="text" className="choice-name" onChange={inputHandler} value={inputValue} />
      <div className="choice-color">
        <PopoverPicker color={color} onChange={setColor} />
      </div>
      <button type="button" className="update-button" onClick={() => props.clickHandler(inputValue, color)}>
        Update
      </button>
    </div>
  );
}