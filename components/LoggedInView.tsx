"use client";

import { initiateTransaction, passportInstance } from "@/lib/immutable";
import React, { useEffect, useState } from "react";
import TransactionComponent from "./TransactionComponent";

interface UserProfile {
  nickname?: string;
  email?: string;
  sub?: string;
  accessToken?: string;
  idToken?: string;
}

const LoggedInView = () => {
  const [user, setUser] = useState<UserProfile | undefined>();

  const [copiedIdToken, setCopiedIdToken] = useState(false);
  const [copiedAccessToken, setCopiedAccessToken] = useState(false);

  const copyToClipboard = (
    text?: string,
    setCopied?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (text && setCopied) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the "Copied" state after 2 seconds
      });
    }
  };

  const fetchUser = async () => {
    try {
      const userProfile = await passportInstance.getUserInfo();
      const accessToken = await passportInstance.getAccessToken();
      const idToken = await passportInstance.getIdToken();

      setUser({
        sub: userProfile?.sub,
        email: userProfile?.email,
        nickname: userProfile?.nickname,
        accessToken: accessToken,
        idToken: idToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <nav className="flex justify-between items-center p-2 bg-gray-300 border-b">
        <div>
          <h1 className="text-2xl font-mono font-bold text-center text-gray-800">
            Immutable Passport Sample App
          </h1>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 transition-colors  text-white rounded-md p-2"
          onClick={() => passportInstance.logout()}
        >
          Logout
        </button>
      </nav>
      <div className="bg-white p-6 rounded-lg shadow-md m-2">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          🌟 User Profile
        </div>
        <div className="text-gray-700">
          <p className="mb-2">
            <span className="font-semibold">Nickname:</span> {user?.nickname}
          </p>
          <hr className="my-2" />
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <hr className="my-2" />
          <p className="mb-2 ">
            <span className="font-semibold">Id Token:</span>{" "}
            <span className="overflow-x-scroll max-w-[80vw] block whitespace-nowrap">
              {user?.idToken}
            </span>
            <span className="font-semibold">(scroll to view)</span>{" "}
            <button
              onClick={() => copyToClipboard(user?.idToken, setCopiedIdToken)}
              className="text-blue-500 ml-2 cursor-pointer"
            >
              {copiedIdToken ? "Copied!" : "Copy"}
            </button>
          </p>
          <hr className="my-2" />
          <p className="mb-2">
            <span className="font-semibold ">Access Token:</span>{" "}
            <span className="overflow-x-scroll max-w-[80vw] block whitespace-nowrap">
              {user?.accessToken}
            </span>
            <span className="font-semibold">(scroll to view)</span>
            <button
              onClick={() => copyToClipboard(user?.idToken, setCopiedIdToken)}
              className="text-blue-500 ml-2 cursor-pointer"
            >
              {copiedAccessToken ? "Copied!" : "Copy"}
            </button>
          </p>
          <hr className="my-2" />
          <p>
            <span className="font-semibold">Sub:</span> {user?.sub}
          </p>
        </div>
        <div className="my-3">
          <TransactionComponent />
        </div>
      </div>
    </div>
  );
};

export default LoggedInView;
