"use client";

import { fetchAuth } from "@/lib/immutable";
import React from "react";

const LoginView = () => {
  // loading
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Immutable Passport Sample App
      </h1>
      <button
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${
          loading ? "opacity-50 " : ""
        }`}
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await fetchAuth();

          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default LoginView;
