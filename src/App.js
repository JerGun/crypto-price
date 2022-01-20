import { React, useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Scrollbars } from "react-custom-scrollbars";

import logo from "./logo.svg";
import arrowDown from "./assets/arrow-down.svg";
import carretUp from "./assets/caret-up.svg";
import carretDown from "./assets/caret-down.svg";
import swap from "./assets/swap.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(undefined);
  const [syncDate, setSyncDate] = useState();
  const [syncTime, setSyncTime] = useState();
  const [hoverSwap, setHoverSwap] = useState(false);
  const [firstToken, setFirstToken] = useState("btc");
  const [secondToken, setSecondToken] = useState("btc");

  useEffect(() => {
    syncData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      syncData();
      console.log("Logs every minute");
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const syncData = () => {
    var currentdate = new Date();
    var date =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    var time =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    setSyncDate(date);
    setSyncTime(time);

    fetch("https://jergun-bot.herokuapp.com/all", {
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((result) => {
        setData(result);
        setFirstToken(result[0].id);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const toggleHover = () => {
    setHoverSwap(!hoverSwap);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="h-11/12 w-11/12 flex justify-between">
        <div className="h-fit w-3/4">
          <div className="h-fit w-fit ml-5 px-5 py-3 flex space-x-1 rounded-xl text-white bg-input">
            <p>Last Sync:</p>
            <p className="text-primary">{syncDate}</p>
            <p>@</p>
            <p className="text-primary">{syncTime}</p>
          </div>
          <div className="flex flex-wrap">
            {data?.map((item, i) => (
              <div
                key={i}
                className="h-fit w-72 p-5 m-5 rounded-2xl space-y-1 shadow-lg text-white bg-input"
              >
                <div className="flex items-center space-x-3">
                  <img
                    key={item.id}
                    src={require(`./assets/${item.id}.svg`)}
                    className="h-6 w-6"
                    alt={item.id}
                  />
                  <p className="text-2xl">
                    {item.name} ({item.symbol})
                  </p>
                </div>
                <div className="flex text-3xl space-x-5">
                  <p>THB</p>
                  <p>{item.price.thb}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p
                    className={
                      parseInt(item.change) > 0
                        ? "text-xl text-up"
                        : "text-xl text-down"
                    }
                  >
                    {item.change}%
                  </p>
                  {parseInt(item.change) > 0 ? (
                    <img src={carretUp} className="h-4 w-4" alt="logo" />
                  ) : (
                    <img src={carretDown} className="h-4 w-4" alt="logo" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full w-1/4 m-5 flex flex-col items-center rounded-2xl shadow-lg bg-input text-white">
          <p className="text-2xl py-5">Compare</p>
          <span className="h-1 w-full divider-x"></span>
          <div className="w-full p-5 flex flex-col items-center space-y-5">
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-1 font-bold text-xl">
                <Listbox value={firstToken} onChange={setFirstToken}>
                  <div className="relative inline-block text-left">
                    <div>
                      <Listbox.Button className="inline-flex justify-center items-center space-x-3 w-full font-bold text-xl text-white rounded-md">
                        <img src={require(`./assets/${firstToken}.svg`)} className="h-6 w-6" alt="logo" />
                        <p className="uppercase">{firstToken}</p>
                        <ChevronDownIcon
                          className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />
                      </Listbox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Listbox.Options className="absolute left-0 w-56 mt-3 origin-top-right bg-sub-text rounded-xl shadow-lg">
                        <div className="h-72 px-1 py-1 ">
                          <Scrollbars>
                            {data?.map((item, i) => (
                              <Listbox.Option key={i} value={item.id} >
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-background text-white disabled"
                                        : "text-black"
                                    } group flex rounded-xl items-center space-x-5 w-full px-5 py-2 font-bold text-lg`}
                                    
                                  >
                                    <img
                                      src={require(`./assets/${item.id}.svg`)}
                                      className="h-6 w-6"
                                      alt="logo"
                                    />
                                    <div className="flex flex-col items-start">
                                      <p>{item.symbol}</p>
                                      <p
                                        className={
                                          active
                                            ? "text-text"
                                            : "text-base text-input"
                                        }
                                      >
                                        {item.name}
                                      </p>
                                    </div>
                                  </button>
                                )}
                              </Listbox.Option>
                            ))}
                          </Scrollbars>
                        </div>
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <input
                type="number"
                className="w-full p-3 rounded-xl shadow-md bg-hover"
              />
            </div>
            <div
              className="h-10 w-10 flex justify-center items-center rounded-lg shadow-md bg-hover"
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              {hoverSwap ? (
                <button>
                  <img src={swap} className="h-5 w-5 text-white" alt="logo" />
                </button>
              ) : (
                <img
                  src={arrowDown}
                  className="h-5 w-5 text-white"
                  alt="logo"
                />
              )}
            </div>
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-1 font-bold text-xl">
              <Listbox value={secondToken} onChange={setSecondToken}>
                  <div className="relative inline-block text-left">
                    <div>
                      <Listbox.Button className="inline-flex justify-center items-center space-x-3 w-full font-bold text-xl text-white rounded-md">
                        <img src={require(`./assets/${secondToken}.svg`)} className="h-6 w-6" alt="logo" />
                        <p className="uppercase">{secondToken}</p>
                        <ChevronDownIcon
                          className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />
                      </Listbox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Listbox.Options className="absolute left-0 w-56 mt-3 origin-top-right bg-sub-text rounded-xl shadow-lg">
                        <div className="h-72 px-1 py-1 ">
                          <Scrollbars>
                            {data?.map((item, i) => (
                              <Listbox.Option key={i} value={item.id} >
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-background text-white disabled"
                                        : "text-black"
                                    } group flex rounded-xl items-center space-x-5 w-full px-5 py-2 font-bold text-lg`}
                                    
                                  >
                                    <img
                                      src={require(`./assets/${item.id}.svg`)}
                                      className="h-6 w-6"
                                      alt="logo"
                                    />
                                    <div className="flex flex-col items-start">
                                      <p>{item.symbol}</p>
                                      <p
                                        className={
                                          active
                                            ? "text-text"
                                            : "text-base text-input"
                                        }
                                      >
                                        {item.name}
                                      </p>
                                    </div>
                                  </button>
                                )}
                              </Listbox.Option>
                            ))}
                          </Scrollbars>
                        </div>
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <input
                type="number"
                className="w-full p-3 rounded-xl shadow-md bg-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
