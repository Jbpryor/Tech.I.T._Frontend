import { useState, useEffect } from 'react';

function useCountdownTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          return initialSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return seconds;
}

export default useCountdownTimer;
