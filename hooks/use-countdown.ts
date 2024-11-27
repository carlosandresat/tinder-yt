"use client"

import { useState, useEffect } from "react";

export const useCountdown = (targetDate: Date) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { días: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    return {
      días: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
