import React  from 'react';

import logo from "./logo.svg";
import down from "./assets/down.svg";
import arrowDown from "./assets/arrow-down.svg";
import carretUp from "./assets/caret-up.svg";
import carretDown from "./assets/caret-down.svg";
import swap from "./assets/swap.svg";
import "./App.css";

function App() {
  const currencies = [
    "BTC",
    "ETH",
    "BNB",
    "KUB",
    "CCAR",
    "CPAN",
    "CGAR",
    "BCOIN",
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="h-11/12 w-11/12 flex justify-between">
        <div className="w-3/4 flex flex-wrap space-x-10">
          {[...Array(10)].map((x, i) => (
            <div className="h-fit w-64 p-5 rounded-2xl space-y-1 text-white bg-input">
              <div className="flex items-center">
                <img src={logo} className="h-10 w-10" alt="logo" />
                <p className="text-2xl">Bitcoin (BTC)</p>
              </div>
              <div className="flex text-3xl space-x-5">
                <p>THB</p>
                <p>50.00</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-xl text-up">14.4%</p>
                <img src={carretUp} className="h-4 w-4" alt="logo" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-full w-1/4 flex flex-col items-center rounded-2xl bg-input text-white">
          <p className="text-2xl py-5">Compare</p>
          <span className="h-1 w-full divider-x"></span>
          <div className="w-full p-5 flex flex-col items-center space-y-3">
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-1 font-bold text-xl">
                <img src={logo} className="h-10 w-10" alt="logo" />
                <p>{currencies[0]}</p>
              </div>
              <input type="number" className="w-full p-3 rounded-xl bg-hover" />
            </div>
            <img src={arrowDown} className="h-5 w-5 text-white" alt="logo" />
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-1 font-bold text-xl">
                <img src={logo} className="h-10 w-10" alt="logo" />
                <p>{currencies[0]}</p>
              </div>
              <input type="number" className="w-full p-3 rounded-xl bg-hover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
