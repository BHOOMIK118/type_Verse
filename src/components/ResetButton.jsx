import React from "react";

const ResetButton = ({ handleReset }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleReset}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg mt-4"
      >
        Reset
      </button>
    </div>
  );
};

export default ResetButton;