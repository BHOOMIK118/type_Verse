import React from "react";

const PlayerProgressBar = ({ progress }) => {
  return (
    <div className="w-3/5 bg-neutral-800 mx-auto rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-green-500"
        style={{
          width: `${progress}%`,
          transition: "width 0.3s ease",
        }}
      ></div>
    </div>
  );
};

export default PlayerProgressBar;