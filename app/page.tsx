"use client";

import LoggedInView from "@/components/LoggedInView";
import LoginView from "@/components/LoginView";
import { passportInstance } from "@/lib/immutable";
import { useEffect, useState } from "react";

export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    // Use an async function to handle the Promise returned by IsUserLogged
    const checkUserLoggedIn = async () => {
      try {
        const isAccessToken = await passportInstance.getAccessToken();
        if (isAccessToken === undefined) {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsUserLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (isUserLoggedIn) {
    return <LoggedInView />;
  }

  return <LoginView />;
}
