import React from "react";

const VirtualKeyboard = ({ activeKey, handleKeyPress }) => {
  const keyboardKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    [" "],
  ];

  return (
    <div className="mt-8 flex flex-col gap-2">
      {keyboardKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((key) => (
            <div
              key={key}
              className={`p-4 rounded-lg ${
                activeKey === key
                  ? "bg-emerald-500 text-black"
                  : "bg-neutral-800 text-white"
              } transition-all`}
            >
              {key === " " ? "Space" : key.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;