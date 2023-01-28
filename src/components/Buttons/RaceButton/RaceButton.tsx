import './RaceButton.scss';
import ARApi from '../../utils/async-race-api';

export default function RaceBtn() {
  const Api = new ARApi();

  const raceButtonHandler = () => {
    console.log('State of garage (on server):');
    Api.getCars()
      .then((body) => {
        console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button className="race-button" onClick={raceButtonHandler}>
      Race
    </button>
  );
  }