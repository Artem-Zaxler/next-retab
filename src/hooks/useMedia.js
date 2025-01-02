'use client'
import { useEffect, useState } from "react";

export const useMedia = () => {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [typeof window]);

  const isMobile = windowWidth < 480;
  const isDesktop = !isMobile;

  return { isDesktop, isMobile };
};
