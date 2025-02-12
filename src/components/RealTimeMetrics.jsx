import React from "react";

const RealTimeMetrics = ({ elapsedTime, wpm, inputValue, mistakes }) => {
  return (
    <div className="flex justify-between text-neutral-400 mb-4">
      <p>Time: {Math.floor(elapsedTime)}s</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {Math.round((inputValue.length - mistakes) / inputValue.length * 100 || 100)}%</p>
    </div>
  );
};

export default RealTimeMetrics;