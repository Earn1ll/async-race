import "./Garage.scss";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CreateCar from "../Car/Car";
import UpdateCar from "../Car/UpdateCar/UpdateCar";
import RaceBtn from "../Buttons/RaceButton/RaceButton";
import ResetBtn from "../Buttons/ResetButton/ResetButton";
import GenerateCarsBtn from "../Buttons/GenerateCarsButton/GenerateCarsButton";
import Raceline from "../RaceLine/RaceLine";
import { carList } from '../utils/CarNames/CarNames';

const items = [
  ...Array(14)
    .fill(0)
    .map((item, idx) => <Raceline key={idx} name={'Audi'} />),
];


export default function Garage() {

  const [cars, setCars] = useState<{ racelines: JSX.Element[] }>({
    racelines: [],
  });

  const generateCars = () => {
    let arrCarNames = [];
    let racelines: JSX.Element[] = [];
    while (arrCarNames.length < 10) {
      let num1 = Math.floor(Math.random() * 296);
      let num2 = Math.floor(Math.random() * Object.values(carList)[num1].length);
      let Brand = Object.keys(carList)[num1];
      let Model = Object.values(carList)[num1][num2];
      arrCarNames.push(`${Brand} ${Model}`);
      racelines = arrCarNames.map((item, idx) => <Raceline key={idx + Math.random()} name={item} />);
    }
    setCars({ racelines });
    console.log(cars);
  };

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
          <GenerateCarsBtn clickHandler={generateCars} />
        </div>
      </div>
      <div className="garage-titles">
        <h1 className="garage-h1">
          Garage (<span id="total-car-counter">0</span>)
        </h1>
      </div>
      <div className="garage-raceway">
        <PaginatedItems itemsPerPage={7} />
      </div>
      {/* <div className="garage-pagination"></div> */}
    </div>
  );
}

// @ts-ignore
function Items({ currentItems }) {
  return <>{currentItems && currentItems.map((item: React.FC) => item)}</>;
}

// @ts-ignore
function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // @ts-ignore
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate breakLabel="..." nextLabel="next" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="prev" renderOnZeroPageCount={() => null} />
    </>
  );
}