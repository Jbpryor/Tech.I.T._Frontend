import { useState } from "react";

const useCountdown = (initialCountdown) => {
  const [countdown, setCountdown] = useState(initialCountdown);

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return { countdown, setCountdown, startCountdown };
};

export default useCountdown;
