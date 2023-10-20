import { initiateTransaction } from "@/lib/immutable";
import React, { useState } from "react";

interface TransactionComponentProps {
  onTransactionInitiate: () => void;
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({
  onTransactionInitiate,
}) => {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  return (
    <div>
      <button
        onClick={initiateTransaction}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"
      >
        Initiate Transaction
      </button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default TransactionComponent;
