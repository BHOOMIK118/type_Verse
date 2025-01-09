import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWPM,
  setCPM,
  setMistakes,
  setIsTyping,
  setCharIndex,
  setInputValue,
  resetGame,
  setText,
  setTimeLeft,
  setGameOver,
} from "../features/typing/typingSlice";

const TypingGame = () => {
  const dispatch = useDispatch();
  const {
    text,
    timeLeft,
    wpm,
    cpm,
    mistakes,
    isTyping,
    charIndex,
    inputValue,
    gameOver,
  } = useSelector((state) => state.typing);

  const inputRef = useRef(null);

  // Words Array from the JavaScript logic
  const wordsArray = `
   The quick brown fox jumps over the lazy dog. Typing games are a fun way to improve your speed and accuracy.
   Practice makes perfect, and consistent effort leads to progress. Remember to keep your posture straight and your
   hands relaxed as you type. Accuracy is more important than speed, so take your time and focus on hitting
    the right keys. As you get better, your speed will naturally increase.
  `.trim().split(/\s+/);

  const initializeWords = (wordCount = 10) => {
    const randomWords = [];
    for (let i = 0; i < wordCount; i++) {
      randomWords.push(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    }
    dispatch(setText(randomWords.join(" ")));
  };

  const handleTyping = (e) => {
    const input = e.target.value;

    if (!isTyping) {
      dispatch(setIsTyping(true));
    }

    if (input.length < inputValue.length) {
      dispatch(setInputValue(input));
      dispatch(setCharIndex(charIndex - 1));
      return;
    }

    const currentChar = text[charIndex];
    const typedChar = input[input.length - 1];

    if (typedChar === currentChar) {
      dispatch(setCharIndex(charIndex + 1));
    } else {
      if (typedChar !== text[charIndex]) {
        dispatch(setMistakes(mistakes + 1));
      }
    }

    dispatch(setInputValue(input));
    calculatePerformanceMetrics();
  };

  // const calculatePerformanceMetrics = () => {
  //   const timeSpent = 60 - timeLeft;
  //   const calculatedWPM = Math.round(
  //     ((charIndex - mistakes) / 5) / (timeSpent / 60)
  //   );
  //   const calculatedCPM = Math.round((charIndex - mistakes) / (timeSpent / 60));

  //   dispatch(setWPM(calculatedWPM || 0));
  //   dispatch(setCPM(calculatedCPM || 0));
  // };

  const handleReset = (wordCount = 10) => {
    dispatch(resetGame());
    initializeWords(wordCount);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    initializeWords();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(setGameOver(true));
    } else if (isTyping) {
      const timer = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isTyping]);

  return (
    <div className="w-screen mx-auto bg-gradient-to-b from-neutral-900 to-black min-h-screen text-white p-8">
      <div className="mb-8">
        <div className=" mx-auto w-full max-w-xl flex flex-wrap items-center justify-center gap-3 bg-neutral-900/50 p-4 rounded-full shadow-lg">
          <p className="rounded-full px-4 py-2 flex items-center transition-colors duration-200 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hourglass mr-2"
            >
              <path d="M5 22h14"></path>
              <path d="M5 2h14"></path>
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
            </svg>
            {timeLeft}s
          </p>
          {/* <button className="rounded-full px-4 py-2 flex items-center transition-colors duration-200 bg-neutral-800 text-neutral-200">
            WPM: {wpm}
          </button>
          <div className="h-7 w-px bg-neutral-700"></div>
          <button className="rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200 bg-neutral-800 text-neutral-200">
            CPM: {cpm}
          </button>
          <button className="rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300">
            Mistakes: {mistakes}
          </button> */}
          
        <button
          onClick={() => handleReset(10)}
          className="bg-neutral-900 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          10 
        </button>
        <button
          onClick={() => handleReset(25)}
          className="bg-neutral-900 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          25
        </button>
        <button
          onClick={() => handleReset(50)}
          className="bg-neutral-900 hover:bg-neutral-800 hover:border-none text-white px-4 py-2 rounded-full"
        >
          50
        </button>
 
        </div>
        
      </div>
     
      <div className="flex items-center flex-col">
      <div className="relative text-2xl leading-relaxed tracking-wide mt-8 bg-transparent p-6 rounded-lg">
        {text.split("").map((char, index) => {
          let className = "text-neutral-600";
          if (index < inputValue.length) {
            className =
              inputValue[index] === char ? "text-green-500" : "text-red-500";
          }
          if (index === charIndex) {
            className += " border-b-2 border-green-500";
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
          className="absolute inset-0 opacity-0 focus:outline-none"
          style={{ color: "transparent", caretColor: "green" }}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleReset(10)}
          className="bg-green-500 hover:bg-green-600 hover:border-none text-white px-8 py-2 rounded-lg"
        >
          Reset
        </button>
        </div>
        </div>
    </div>
  );
};

export default TypingGame;
