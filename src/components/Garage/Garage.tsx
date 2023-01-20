import "./Garage.scss";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CreateCar from "../Car/Car";
import UpdateCar from "../Car/UpdateCar/UpdateCar";
import RaceBtn from "../Buttons/RaceButton/RaceButton";
import ResetBtn from "../Buttons/ResetButton/ResetButton";
import GenerateCarsBtn from "../Buttons/GenerateCarsButton/GenerateCarsButton";
import Raceline from "../RaceLine/RaceLine";
import { carList } from "../utils/CarNames/CarNames";

export default function Garage() {
  let items: string[] = [
    "car1",
    "car2",
    "car3",
    "car4",
    "car5",
    "car6",
    "car7",
    "car8",
    "car9",
    "car10",
  ];

  const [cars, setCars] = useState<{ arrCarNames: string[] }>({
    arrCarNames: [],
  });
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

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

  const generateCars = () => {
    let arrCarNames = [];
    //let racelines: JSX.Element[] = [];
    while (arrCarNames.length < 10) {
      let num1 = Math.floor(Math.random() * 296);
      let num2 = Math.floor(
        Math.random() * Object.values(carList)[num1].length
      );
      let Brand = Object.keys(carList)[num1];
      let Model = Object.values(carList)[num1][num2];
      arrCarNames.push(`${Brand} ${Model}`);
      /*
      racelines = arrCarNames.map((item, idx) => (
        <Raceline key={idx + Math.random()} name={item} />
      ));
      */
    }
    setCars({ arrCarNames });
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
      {currentItems && (currentItems as string[]).map((item: string, idx: number) => <Raceline key={idx + Math.random()} name={item} />)}
      </div>
      <div className="garage-pagination">
        <ReactPaginate breakLabel="..." nextLabel="next" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="prev" renderOnZeroPageCount={() => null} />
      </div>
    </div>
  );
}

