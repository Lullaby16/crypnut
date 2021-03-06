import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { shortenAddress } from "../utils/shortenAddress";
import useDarkMode from "../hooks/useDarkMode";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-md p-2 bg-white text-black border-0 text-sm border-black"
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  const [setTheme, colorTheme] = useDarkMode();

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center font-fira dark:bg-black">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-black dark:text-white py-1">
            Send Crypto <br /> for the love one <br /> across the world
          </h1>
          <p className="text-left mt-5 text-black dark:text-white md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Send and receive crypto to anyone with
            your special message and gif through blockchain with crypNut.
          </p>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#85F4FF] p-3 rounded-full cursor-pointer hover:bg-[#42C2FF]"
            >
              <p className="text-black text-base">Connect Wallet</p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              <p className="text-black dark:text-white text-base">
                Reliability
              </p>
            </div>
            <div className={commonStyles}>
              <p className="text-black dark:text-white text-base">Security</p>
            </div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              <p className="text-black dark:text-white text-base">Simplicity</p>
            </div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>
              <p className="text-black dark:text-white text-base">Web 3.0</p>
            </div>
            <div className={commonStyles}>
              <p className="text-black dark:text-white text-base">Ethereum</p>
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              <p className="text-black dark:text-white text-base">Blockchain</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 border-2 border-black dark:border-white">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white bg-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#000" />
                </div>
                <div className="w-5 h-5 rounded-full dark:border-white bg-white flex justify-center items-center">
                  <BsInfoCircle fontSize={17} color="#000" />
                </div>
              </div>
              <div>
                <p className="text-black dark:text-white text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-black dark:text-white text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-[#85F4FF] rounded-xl border-2 border-black dark:border-white">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-black bg-[#fff] hover:bg-[#42C2FF] w-full mt-2 border-[1px] p-2 border-[#fff] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
