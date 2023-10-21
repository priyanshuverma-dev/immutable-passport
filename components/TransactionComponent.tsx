import { initiateTransaction } from "@/lib/immutable";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TransactionComponent = ({}) => {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  // set input value
  const [inputValue, setInputValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleTransaction = async () => {
    try {
      setLoading(true);
      const transactionHash = await initiateTransaction({
        data: inputValue,
      });

      if (transactionHash.error !== null) {
        throw new Error(transactionHash.error);
      }

      setTransactionHash(transactionHash.txHash);

      toast.success("Transaction Successful");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        value={inputValue}
        disabled={loading}
        onChange={(e) => setInputValue(e.target.value)}
        className=" rounded-md p-2 outline-none border-2 m-2"
        type="text"
        placeholder="Enter to be stored on Blockchain (Optional)"
      />
      <button
        onClick={handleTransaction}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"
      >
        {loading ? "Loading..." : "Initiate Transaction"}
      </button>
      {transactionHash && <p>Transaction Hash: {`${transactionHash}`}</p>}
    </div>
  );
};

export default TransactionComponent;
