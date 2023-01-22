import './Winners.scss';
import { useEffect, useState, useMemo } from 'react';
import { IWinner,iWinnerApi } from '../utils/types';
import ReactPaginate from 'react-paginate';
import WinnerInstance from '../Winners/WinnersInstance/WinnersInstance';
import ARApi from '../utils/async-race-api';

export default function Winners() {
  const Api = useMemo(() => new ARApi(), []);

  const [winners, setWinners] = useState<{ arrWinners: IWinner[] }>({
    arrWinners: [],
  });
  const [currentItems, setCurrentItems] = useState([
    {
      number: 1,
      color: 'black',
      name: 'car',
      wins: 11,
      bestTime: 1.11,
    },
  ]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(Object.values(winners.arrWinners).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Object.keys(winners.arrWinners).length / itemsPerPage));
  }, [itemOffset, itemsPerPage, winners]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % Object.keys(winners.arrWinners).length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    Api.getWinners()
      .then((body) => {
        body.forEach((item: iWinnerApi, idx: number) => {
          Api.getCar(item.id!).then((data) => {
            setWinners((previousState) => ({
              arrWinners: [
                ...previousState.arrWinners,
                {
                  number: idx + 1,
                  color: data.color,
                  name: data.name,
                  wins: item.wins,
                  bestTime: item.time,
                },
              ],
            }));
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Api]);
  return (
    <div className="winners">
      <div className="winners-titles">
        <h1 className="winners-h1">
          Winners (<span>{winners.arrWinners.length}</span>)
        </h1>
      </div>
      <div className="winners-pagination">
        <ReactPaginate breakLabel="..." nextLabel="next" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="prev" renderOnZeroPageCount={() => null} />
      </div>
      <div className="winners-list">
        <div className="winner-list-title">
          <p className="wlt-item indent">Number</p>
          <p className="wlt-item indent">Car</p>
          <p className="wlt-item">Name</p>
          <p className="wlt-item">Wins</p>
          <p className="wlt-item">Best time (seconds)</p>
        </div>
        <div className="winners-list-cont">
          {currentItems &&
            currentItems.map((item: IWinner, idx: number) => (
              <WinnerInstance key={idx + Math.random()} number={item.number} color={item.color} name={item.name} wins={item.wins} bestTime={item.bestTime} />
            ))}
        </div>
      </div>
    </div>
  );
}