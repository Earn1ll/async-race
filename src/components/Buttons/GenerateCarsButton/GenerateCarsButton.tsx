import './GenerateCarsButton.scss';
import { MouseEventHandler } from 'react';

export default function GenerateCarsBtn(props: { clickHandler: MouseEventHandler<HTMLButtonElement> | undefined; }) {
  return (
    <button className="generate-cars-button" onClick={props.clickHandler}></button>
  )
  }