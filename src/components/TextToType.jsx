import React from "react";

const TextToType = ({ text, inputValue, handleTyping, handleKeyPress, inputRef }) => {

 


  return (
    <div className="relative text-2xl leading-relaxed tracking-wide mt-8 bg-transparent p-6 rounded-lg">
      {text.split("").map((char, index) => {
        let className = "text-neutral-600";
        if (index < inputValue.length) {
          className =
            inputValue[index] === char ? "text-green-500" : "text-red-500";
        }
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleTyping}
        onKeyDown={(e) => handleKeyPress(e.key)}
        className="absolute inset-0 opacity-0 focus:outline-none"
        style={{ color: "transparent", caretColor: "green" }}
      />
    </div>
  );
};

export default TextToType;