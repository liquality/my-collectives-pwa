import { useState, useEffect } from "react";



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [isDesktop, setIsDesktop] = useState(false);
    const { width, height } = getWindowDimensions();
    if(width > 720 && !isDesktop) {
        setIsDesktop(true);
    } 
  const [windowDimensions, setWindowDimensions] = useState(
    { width, height }
  );

  useEffect(() => {
    function handleResize() {
        const { width, height } = getWindowDimensions();
        if(width > 720 && !isDesktop) {
            setIsDesktop(true);
        } else if(isDesktop) {
            setIsDesktop(false);
        }
      setWindowDimensions({ width, height });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...windowDimensions,
    isDesktop
  };
}
