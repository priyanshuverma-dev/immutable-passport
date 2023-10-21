"use client";

import { config, passport } from "@imtbl/sdk";
import { ethers } from "ethers";

const passportConfig = {
  clientId: process.env.IMMUTABLE_CLIENT_ID as string,
  redirectUri: "http://localhost:3000/callback",
  logoutRedirectUri: "http://localhost:3000/",
  scope: "transact openid offline_access email",
  audience: "platform_api",

  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX, // Set the appropriate environment value
    apiKey: "", // Provide the apiKey if required
  }),
};
const passportInstance = new passport.Passport(passportConfig);

const passportProvider = passportInstance.connectEvm();

const fetchAuth = async () => {
  try {
    const accounts = await passportProvider.request({
      method: "eth_requestAccounts",
    });
    console.log("connected");
    console.log(accounts);
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
};

async function initiateTransaction({ data }: { data: string }) {
  try {
    const accounts = await passportProvider.request({
      method: "eth_requestAccounts",
    });

    console.log(accounts);

    const hexData = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

    const params: { to: string; data?: string } = {
      to: accounts[0],
    };

    if (data) {
      params.data = hexData;
    }

    const tx = await passportProvider.request({
      method: "eth_sendTransaction",
      params: [params],
    });
    console.log(tx);

    return {
      txHash: tx,
      error: null,
    };
  } catch (error: any) {
    console.log("err", error.message);
    return {
      txHash: null,
      error: error.message,
    };
  }
}

export { passportInstance, passportProvider, fetchAuth, initiateTransaction };
