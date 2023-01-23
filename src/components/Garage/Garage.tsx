import "./Garage.scss";
import { CarItem } from "../utils/types";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CreateCar from "../Car/Car";
import UpdateCar from "../Car/UpdateCar/UpdateCar";
import RaceBtn from "../Buttons/RaceButton/RaceButton";
import ResetBtn from "../Buttons/ResetButton/ResetButton";
import GenerateCarsBtn from "../Buttons/GenerateCarsButton/GenerateCarsButton";
import Raceline from "../RaceLine/RaceLine";
import { carList } from "../utils/CarNames/CarNames";
import ARApi from "../utils/async-race-api";
import Popup from "../Popup/Popup";

export default function Garage() {
  const [cars, setCars] = useState<{ arrCars: CarItem[] }>({
    arrCars: [],
  });
  const [currentItems, setCurrentItems] = useState([
    {
      name: 'name',
      color: 'color',
    },
  ]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;
  const Api = new ARApi();
  const [resetRace, setResetRace] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(Object.values(cars.arrCars).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Object.keys(cars.arrCars).length / itemsPerPage));
  }, [itemOffset, itemsPerPage, cars]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % Object.keys(cars.arrCars).length;
    setItemOffset(newOffset);
  };

  const generateCars = () => {
    let newCars: CarItem[] = [];
    while (newCars.length < 100) {
      let num1 = Math.floor(Math.random() * 296);
      let num2 = Math.floor(Math.random() * Object.values(carList)[num1].length);
      let Brand = Object.keys(carList)[num1];
      let Model = Object.values(carList)[num1][num2];
      newCars.push({ name: `${Brand} ${Model}`, color: getRandomColor() });
    }

    function getRandomColor() {
      let randomNum = () => Math.round(0 + Math.random() * 255);
      const randomColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
      return randomColor;
    }

    setCars((previousState) => ({
      arrCars: [...previousState.arrCars, ...newCars],
    }));
    newCars.forEach((car) => Api.createCar(car));
  };
  

  const createCar = (color: string, inputValue: string) => {
    const item: CarItem = {
      name: inputValue,
      color: color,
    };
    setCars((previousState) => ({
      arrCars: [...previousState.arrCars, item],
    }));
    Api.createCar({ name: inputValue, color: color });
  };

  const [colorSC, setColorSC] = useState('#aabbcc');
  const [inputValueSC, setInputSC] = useState('');

  const getSelectCar = (name: string, color: string) => {
    setInputSC(name);
    setColorSC(color);
  };

  const updateCar = (name: string, color: string) => {
    const idx = cars.arrCars.findIndex((item) => item.color === colorSC && item.name === inputValueSC);
    setCars({
      arrCars: [(cars.arrCars[idx] = { name: name, color: color }), ...cars.arrCars].slice(1),
    });
    Api.updateCar(2, { name: 'Mashina', color: 'Rozoviy' });
  };

  const removeCar = (name: string, color: string) => {
    const idx = cars.arrCars.findIndex((item) => item.name === name && item.color === color);
    setCars({
      arrCars: [...cars.arrCars.slice(0, idx), ...cars.arrCars.slice(idx + 1)],
    });

    Api.deleteCar(4);
  };

  return (
    <div className="garage">
      <div className="garage-controls">
        <div className="garage-controls-1">
          <CreateCar clickHandler={createCar} />
          <UpdateCar name={inputValueSC} color={colorSC} clickHandler={updateCar} />
        </div>
        <div className="garage-controls-2">
          <RaceBtn />
          <ResetBtn setResetRace={setResetRace} />
          <GenerateCarsBtn clickHandler={generateCars} />
        </div>
      </div>
      <div className="garage-titles">
        <h1 className="garage-h1">
          Garage (<span>{cars.arrCars.length}</span>)
        </h1>
      </div>
      <div className="garage-raceway">
        {currentItems &&
          currentItems.map((item: CarItem, idx: number) => (
            <Raceline key={idx + Math.random()} name={item.name} color={item.color} selectButtonHandler={getSelectCar} removeButtonHandler={removeCar} resetRace={resetRace} />
          ))}
          <Popup popupVisible={resultVisible} setPopupVisible={setResultVisible} children={<p>Pobeda!</p>} />
      </div>
      <div className="garage-pagination">
        <ReactPaginate breakLabel="..." nextLabel="next" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="prev" renderOnZeroPageCount={() => null} />
      </div>
    </div>
  );
}
