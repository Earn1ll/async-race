import './Car.scss';
import ColorPicker from '../utils/colorPicker';

export default function CreateCar() {
    return (
      <div className="create-car">
        <input type="text" className="choice-name" />
        <div className="create-choice-color">
        <ColorPicker />
      </div>
        <button type="button" className="create-button">
          Create
        </button>
      </div>
    );
  }