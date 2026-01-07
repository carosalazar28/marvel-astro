import { useState, useEffect } from 'react';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  function calculateTimeLeft(targetDate: string): TimeLeft {
    const targetDateTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = targetDateTime - now;

    if (difference <= 0) {
      return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate months
    const targetDateObj = new Date(targetDate);
    const currentDateObj = new Date();
    
    let months = (targetDateObj.getFullYear() - currentDateObj.getFullYear()) * 12 + 
                 (targetDateObj.getMonth() - currentDateObj.getMonth());
    
    // Adjust if target day is earlier in the month
    if (targetDateObj.getDate() < currentDateObj.getDate()) {
      months--;
    }
    
    // Calculate remaining difference after months
    const tempDate = new Date(currentDateObj);
    tempDate.setMonth(tempDate.getMonth() + months);
    
    const remainingDifference = targetDateTime - tempDate.getTime();
    
    // Calculate days, hours, minutes, seconds from remaining difference
    const days = Math.floor(remainingDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingDifference % (1000 * 60)) / 1000);

    return {
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
