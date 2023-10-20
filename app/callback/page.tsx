"use client";

import { passportInstance } from "@/lib/immutable";
import React from "react";
const CallbackPage = () => {
  window.addEventListener("load", function () {
    passportInstance.loginCallback();
  });
  return <div>CallbackPage</div>;
};

export default CallbackPage;
