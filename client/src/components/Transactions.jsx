import React, { useContext, useRef } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

import useFetch from "../hooks/useFetch";
import exportAsImage from "../utils/exportAsImage.js";

const TransactionCard = ({
  addressTo,
  addressFrom,
  message,
  keyword,
  amount,
  url,
  timestamp,
}) => {
  const gifUrl = useFetch({ keyword });
  const exportRef = useRef(null);

  return (
    <div
      className="bg-[#85F4FF] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl
    "
      ref={exportRef}
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-black text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-black text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-black text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-black text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
        <button
          onClick={() => exportAsImage(exportRef.current, "test")}
          className="mt-3"
        >
          Save Image
        </button>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 font-fira dark:bg-black">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-black dark:text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-black dark:text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
