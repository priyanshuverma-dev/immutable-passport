"use client";

import { fetchAuth } from "@/lib/immutable";
import React from "react";

const LoginView = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Immutable Passport Sample App
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={async () => {
          await fetchAuth();
          window.location.href = "http://localhost:3000";
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginView;
