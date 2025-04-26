"use client";

import { useCountdown } from "@/hooks/use-countdown";

export function Countdown({ targetDate }: { targetDate: Date }) {
  const timeLeft = useCountdown(targetDate);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-8">
      <h2 className="text-2xl font-bold text-center">
        Esta ronda de matches terminará en:
      </h2>
      <div className="flex space-x-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <p className="text-4xl font-bold text-primary" aria-live="polite" suppressHydrationWarning>
              {formatTime(value)}
            </p>
            <div className="text-sm text-gray-500 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
