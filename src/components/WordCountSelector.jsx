import React from "react";

const WordCountSelector = ({ handleReset }) => {
  return (
    <div className="mb-8">
      <div className="mx-auto w-full max-w-xl flex flex-wrap items-center justify-center gap-3 bg-neutral-900/50 p-4 rounded-full shadow-lg">
        <button
          onClick={() => handleReset(10)}
          className="bg-neutral-800 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          10
        </button>
        <button
          onClick={() => handleReset(25)}
          className="bg-neutral-800 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          25
        </button>
        <button
          onClick={() => handleReset(50)}
          className="bg-neutral-800 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          50
        </button>
      </div>
    </div>
  );
};

export default WordCountSelector;