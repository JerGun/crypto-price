import { React, useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

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

  useEffect(() => {
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

    const getAPI = fetch("https://jergun-bot.herokuapp.com/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    const interval = setInterval(() => {
      date =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear();
      time =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      setSyncDate(date);
      setSyncTime(time);
      getAPI;
    }, 300000);
  }, []);

  const toggleHover = () => {
    setHoverSwap(!hoverSwap);
  };

  function EditInactiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
      </svg>
    )
  }

  function EditActiveIcon(props) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 13V16H7L16 7L13 4L4 13Z"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>
    )
  }

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
            {data?.map((item) => (
              <div className="h-fit w-72 p-5 m-5 rounded-2xl space-y-1 shadow-lg text-white bg-input">
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
                <img src={logo} className="h-10 w-10" alt="logo" />
                <p>sad</p>
              </div>
              <input
                type="number"
                className="w-full p-3 rounded-xl shadow-md bg-hover"
              />
            </div>
            <div
              className="h-5"
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
                <img src={logo} className="h-10 w-10" alt="logo" />
                <p>asd</p>
              </div>
              <input
                type="number"
                className="w-full p-3 rounded-xl shadow-md bg-hover"
              />
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Options
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
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
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <EditActiveIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <EditInactiveIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          )}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    
                  </div>
                  
                  
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
