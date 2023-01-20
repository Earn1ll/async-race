import './Car.scss';

export default function CreateCar() {
    return (
      <div className="create-car">
        <input type="text" className="choice-name" />
        <div className="choice-color"></div>
        <button type="button" className="create-button">
          Create
        </button>
      </div>
    );
  }