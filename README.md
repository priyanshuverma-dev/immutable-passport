# Immutable Passport Integration Guide

This guide explains how to integrate Immutable Passport into your application. Immutable Passport is a blockchain-based authentication and authorization service designed for gaming applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Creating a Simple Application](#1-creating-a-simple-application)
- [2. Registering the Application on Immutable Developer Hub](#2-registering-the-application-on-immutable-developer-hub)
- [3. Installing and Initializing the Passport Client](#3-installing-and-initializing-the-passport-client)
- [4. Logging in a User with Passport](#4-logging-in-a-user-with-passport)
- [5. Displaying User Information](#5-displaying-user-information)
- [6. Logging Out a User](#6-logging-out-a-user)
- [7. Initiating a Transaction from Passport](#7-initiating-a-transaction-from-passport)

## Prerequisites

Before getting started, make sure you have the following:

- An Immutable Developer Hub account.
- A Next.js application or a similar web application.

## 1. Creating a Simple Application

You can create a simple Next.js application or clone a repository of a pre-built application. Ensure that your application is set up and running.

## 2. Registering the Application on Immutable Developer Hub

1. Sign in to your Immutable Developer Hub account.
2. Register your application to obtain a client ID.
3. add client ID to .env file `IMMUTABLE_CLIENT_ID="Client_ID"`

## 3. Installing and Initializing the Passport Client

In your application, you need to install the required dependencies and initialize the Passport client. Here is an example code snippet:

```javascript
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
```

## 4. Logging in a User with Passport

To log in a user, use the following code snippet:

```javascript
import { passportProvider, fetchAuth } from "@/lib/immutable";

const fetchAuth = async () => {
  try {
    const accounts = await passportProvider.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected");
    console.log(accounts);
  } catch (error) {
    console.log(error);
  }
};
```

## 5. Displaying User Information

You can display user information, including the ID token and access token. Use the provided code to fetch and display user data.

```javascript
import { passportInstance } from "@/lib/immutable";

const fetchUser = async () => {
  try {
    const userProfile = await passportInstance.getUserInfo();
    const accessToken = await passportInstance.getAccessToken();
    const idToken = await passportInstance.getIdToken();

    // Display user information on your app
  } catch (error) {
    console.log(error);
  }
};
```

## 6. Logging Out a User

To log out a user, use the following code:

```javascript
import { passportInstance } from "@/lib/immutable";

const handleLogout = () => {
  passportInstance.logout();
};
```

## 7. Initiating a Transaction from Passport

You can initiate a transaction using Passport. Make sure to provide the necessary transaction data and parameters:

```javascript
import { passportProvider, initiateTransaction } from "@/lib/immutable";

const handleTransaction = async (data) => {
  try {
    const transactionHash = await initiateTransaction({ data });
    // Handle the transaction response
  } catch (error) {
    console.error(error);
  }
};
```

That's it! You've successfully integrated Immutable Passport into your application.
