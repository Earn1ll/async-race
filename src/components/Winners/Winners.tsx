import './Winners.scss';
import { IWinner } from '../utils/types';
import WinnerInstance from '../Winners/WinnersInstance/WinnersInstance';

const ArrWinners: Array<IWinner> = [
  {
    number: 1,
    color: 'green',
    name: 'audi',
    wins: 3,
    bestTime: 1.45,
  },
  {
    number: 2,
    color: 'orange',
    name: 'bmw',
    wins: 2,
    bestTime: 1.73,
  },
];

function Winners() {
  const winnersRender = ArrWinners.map((item, idx) => {
    return <WinnerInstance number={item.number} color={item.color} name={item.name} wins={item.wins} bestTime={item.bestTime} key={idx} />;
  });
  return (
    <div className="winners">
      <div className="winners-titles">
        <h1 className="winners-h1">
          Winners (<span id="total-winners-counter">0</span>)
        </h1>
      </div>
      <div className="winners-pagination">*pagination*</div>
      <div className="winners-list">
        <div className="winner-list-title">
          <p className="wlt-item">Number</p>
          <p className="wlt-item">Car</p>
          <p className="wlt-item">Name</p>
          <p className="wlt-item">Wins</p>
          <p className="wlt-item">Best time (seconds)</p>
        </div>
        <div className="winners-list-cont">{winnersRender}</div>
      </div>
    </div>
  );
}

export default Winners;