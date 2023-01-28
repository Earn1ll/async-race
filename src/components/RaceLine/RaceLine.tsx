import "./RaceLine.scss";
import CarInstance from "../Car/CarInstance/CarInstance";
import ARApi from '../utils/async-race-api';
import React, { useEffect, useState, RefObject, useRef } from 'react';

export default function Raceline(props: {
  key: number;
  name: string;
  color: string;
  selectButtonHandler: (name: string, color: string) => void;
  removeButtonHandler: (name: string, color: string) => void;
  resetRace: boolean;
}) {
  const Api = new ARApi();

  const carRef = useRef<SVGSVGElement>(null);
  let carAnim = useRef<Animation | null>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [start, isStarted] = useState(false);

  const [distance, setDistance] = useState('0px');
  const [time, setTime] = useState(0);

  const racelineRef: RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    setName(props.name);
    setColor(props.color);
  }, [props.name, props.color]);


  useEffect(() => {
    if (start === true) {
      carAnim.current = carRef.current!.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${distance})` }], {
        duration: time,
        iterations: 1,
        fill: 'forwards',
      });
    }
    if (start === false && carAnim.current) {
      carAnim.current.pause();
    }
  }, [start, distance, time]);

  useEffect(() => {
    if (props.resetRace === true && carAnim.current) {
      carAnim.current!.cancel();
      isStarted(false);
    }
  }, [props.resetRace]);

  const startButtonHandler = () => {
    Api.startEngine(2).then((body) => {
      setTime(body.distance / body.velocity);
      setDistance(`${racelineRef.current!.offsetWidth * 0.9}px`);
      isStarted(true);

      Api.switchEngineToDriveMode(2).then((body) => {
        Api.stopEngine(2).then((bodyF) => {
          carAnim.current!.pause();
          isStarted(false);
        });
      });
    });
  };

  const stopButtonHandler = () => {
    Api.stopEngine(2).then((body) => {
      carAnim.current!.pause();
      isStarted(false);
    });

    carAnim.current!.pause();
  };

  let startClassNames = 'select-car start-car';
  let stopClassNames = 'select-car stop-car start-pressed';
  if (start) {
    startClassNames += ' start-pressed';
    stopClassNames = 'select-car stop-car';
  }

  return (
    <div className="race-line-cont">
      <div className="car-select">
        <button className="select-car" onClick={() => props.selectButtonHandler(name, color)}>
          Select
        </button>
        <button className="select-car" onClick={() => props.removeButtonHandler(name, color)}>
          Remove
        </button>
        <div className="car-title">{props.name}</div>
      </div>
      <div className="car-cont">
        <div className="start-stop">
          <button className={startClassNames} onClick={startButtonHandler} disabled={start}>
            Start
          </button>
          <button className={stopClassNames} onClick={stopButtonHandler} disabled={!start}>
            Stop
          </button>
        </div>
        <div className="race-line" ref={racelineRef}>
          <CarInstance color={props.color} carRef={carRef} />
          <svg className="finish-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.812 485.812">
            <path d="M437.455 5.92c-39.008 18.125-79.016 32.037-120.232 41.459l-2.373-30.373c-95.775 1.213-185.859 23.125-271.281 62.969C59.69 152.83 75.805 225.688 91.926 298.543c39.006-18.125 79.014-32.041 120.23-41.461.791 10.125 1.584 20.25 2.377 30.373 95.774-1.211 185.858-23.123 271.28-62.967L437.455 5.92zm-141.582 33.5c1.682 18.943 3.361 37.887 5.041 56.832a791.356 791.356 0 0 0-51.646 4.078c-2.191-18.904-4.383-37.809-6.572-56.711a812.835 812.835 0 0 1 53.177-4.199zM179.738 54.833c2.797 18.795 5.588 37.594 8.389 56.389-20.137 4.688-39.84 10.607-59.414 17.09-3.387-18.627-6.77-37.254-10.156-55.879a795.621 795.621 0 0 1 61.181-17.6zM93.211 213.724c-4.627-22.016-9.254-44.029-13.875-66.043a850.561 850.561 0 0 1 48.994-19.236l12.137 66.723a814.17 814.17 0 0 0-47.256 18.556zm57.775 37.198c-3.383-18.627-6.77-37.254-10.152-55.881a583.23 583.23 0 0 1 57.311-16.484l8.391 56.387a562.535 562.535 0 0 0-55.55 15.978zm47.531-72.455c-3.33-22.445-6.668-44.891-10.002-67.336a591.796 591.796 0 0 1 60.358-10.754l7.863 67.719a570.254 570.254 0 0 0-58.219 10.371zm88.171 82.375a813.822 813.822 0 0 1-53.181 4.203l-1.084-12.217c19.905-3.797 52.619-6.164 52.619-6.164.548 4.726 1.096 9.453 1.646 14.178zm-22.997-36.082c-2.191-18.902-4.379-37.807-6.572-56.711a560.802 560.802 0 0 1 49.812-3.936c1.688 18.945 3.359 37.887 5.041 56.832a545.398 545.398 0 0 0-48.281 3.815zM436.172 90.742c4.623 22.014 9.252 44.025 13.873 66.041a850.478 850.478 0 0 1-48.992 19.234c-4.045-22.24-8.09-44.482-12.137-66.721a818.164 818.164 0 0 0 47.256-18.554zm-57.779-37.199c3.387 18.625 6.77 37.252 10.152 55.879a583.082 583.082 0 0 1-57.311 16.486c-2.799-18.795-5.592-37.592-8.389-56.387a568.001 568.001 0 0 0 55.548-15.978zM328.842 195.97l-5.344-68.336c2.459-.537 4.916-1.07 7.363-1.637 3.334 22.441 6.67 44.887 10.004 67.334a558.361 558.361 0 0 1-12.023 2.639zm20.803 53.661c-2.797-18.797-5.59-37.592-8.391-56.389 20.139-4.691 39.836-10.607 59.414-17.092 3.387 18.627 6.771 37.252 10.152 55.881a796.828 796.828 0 0 1-61.175 17.6zM0 92.299c.639 2.252 64.027 226.998 76.131 387.594l30.832-2.324c-12.34-163.736-76.572-391.43-77.221-393.71L0 92.299z" />
          </svg>
        </div>
      </div>
    </div>
  );
}