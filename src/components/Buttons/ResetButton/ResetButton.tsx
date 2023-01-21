import './ResetButton.scss';
import ARApi from '../../utils/async-race-api';

export default function ResetBtn() {
  const Api = new ARApi();

  const resetButtonHandler = () => {
    console.log('State of winners (on server):');

    Api.getWinners()
      .then((body) => {
        console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button className="reset-button" onClick={resetButtonHandler}>
      Reset
    </button>
  );
  }