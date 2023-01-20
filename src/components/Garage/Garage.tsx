import "./Garage.scss";
import CreateCar from "../Car/Car";
import UpdateCar from "../Car/UpdateCar/UpdateCar";
import RaceBtn from "../Buttons/RaceButton/RaceButton";
import ResetBtn from "../Buttons/ResetButton/ResetButton";
import GenerateCarsBtn from "../Buttons/GenerateCarsButton/GenerateCarsButton";
import Raceline from "../RaceLine/RaceLine";

export default function Garage() {
  return (
    <div className="garage">
      <div className="garage-controls">
        <div className="garage-controls-1">
          <CreateCar />
          <UpdateCar />
        </div>
        <div className="garage-controls-2">
          <RaceBtn />
          <ResetBtn />
          <GenerateCarsBtn />
        </div>
      </div>
      <div className="garage-titles">
        <h1 className="garage-h1">
          Garage (<span id="total-car-counter">0</span>)
        </h1>
      </div>
      <div className="garage-raceway">
        <Raceline />
        <Raceline />
        <Raceline />
        <Raceline />
        <Raceline />
        <Raceline />
        <Raceline />
      </div>
      <div className="garage-pagination"></div>
    </div>
  );
}
