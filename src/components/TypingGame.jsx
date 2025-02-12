import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  setText,
  setWPM,
  setCPM,
  setMistakes,
  setIsTyping,
  setInputValue,
  setGameOver,
  resetGame,
} from "../features/typing/typingSlice";
import CompetitorsProgress from "./CompetitorsProgress";
import WordCountSelector from "./WordCountSelector";
import PlayerProgressBar from "./PlayerProgressBar";
import RealTimeMetrics from "./RealTimeMetrics";
import TextToType from "./TextToType";
import ResetButton from "./ResetButton";
import PerformanceGraph from "./PerformanceGraph";
import VirtualKeyboard from "./VirtualKeyboard";

const TypingGame = ({ roomCode, playerName }) => {
  const dispatch = useDispatch();
  const { text, wpm, cpm, mistakes, isTyping, inputValue, gameOver } =
    useSelector((state) => state.typing);

  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    socketRef.current.emit('joinRoom', { roomCode, playerName });
    socketRef.current.emit('playerProgress', { roomCode, playerName, progress: 0, wpm: 0, accuracy: 100 });
    socketRef.current.on('playerProgress', ({ players }) => {
      setCompetitors(players.filter(p => p.name !== playerName));
    });

    return () => socketRef.current?.disconnect();
  }, [roomCode, playerName]);

  // Initialize words
  const initializeWords = (wordCount = 10) => {
    const wordsArray = `
      The quick brown fox jumps over the lazy dog. Typing games are a fun way to improve your speed and accuracy.
      Practice makes perfect, and consistent effort leads to progress. Remember to keep your posture straight and your
      hands relaxed as you type. Accuracy is more important than speed, so take your time and focus on hitting
      the right keys. As you get better, your speed will naturally increase.
    `.trim().split(/\s+/);

    const randomWords = [];
    for (let i = 0; i < wordCount; i++) {
      randomWords.push(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    }
    dispatch(setText(randomWords.join(" ")));
  };

  // Handle typing input
  const handleTyping = (e) => {
    const input = e.target.value;

    if (!isTyping) {
      dispatch(setIsTyping(true));
      setStartTime(Date.now());
    }

    const totalChars = text.length;
    const inputLength = input.length;
    const newProgress = Math.floor((inputLength / totalChars) * 100);
    setProgress(newProgress);

    socketRef.current?.emit('updateProgress', {
      roomCode,
      playerName,
      progress: newProgress,
      wpm,
      accuracy: Math.round((inputLength - mistakes) / inputLength * 100 || 100),
    });

    const currentChar = text[inputLength - 1];
    const typedChar = input[inputLength - 1];

    if (typedChar === currentChar) {
      dispatch(setInputValue(input));
    } else {
      dispatch(setMistakes(mistakes + 1));
      dispatch(setInputValue(input));
    }

    calculatePerformanceMetrics(input);

    if (newProgress >= 100) {
      dispatch(setGameOver(true));
      dispatch(setIsTyping(false));
      setShowGraph(true);
      socketRef.current?.emit('gameComplete', {
        roomCode,
        playerName,
        wpm,
        accuracy: Math.round((inputLength - mistakes) / inputLength * 100 || 100),
      });
    }
  };

  // Handle key press (for virtual keyboard)
  const handleKeyPress = (key) => {
    setActiveKey(key); // Highlight the pressed key
    setTimeout(() => setActiveKey(null), 100); // Remove the highlight after 100ms

    // Update the input value based on the pressed key
    if (key === "Backspace") {
      dispatch(setInputValue(inputValue.slice(0, -1))); // Remove the last character
    } else if (key === " ") {
      dispatch(setInputValue(inputValue + " ")); // Add a space
    } else if (key.length === 1) {
      dispatch(setInputValue(inputValue + key)); // Add the pressed character
    }
  };

  // Calculate performance metrics
  const calculatePerformanceMetrics = (input) => {
    const totalChars = text.length;
    const correctChars = input.split("").filter((char, i) => char === text[i]).length;
    const timeElapsed = (Date.now() - startTime) / 1000;
    const calculatedWPM = Math.round((correctChars / 5) / (timeElapsed / 60));
    const calculatedCPM = Math.round(correctChars / (timeElapsed / 60));
    const accuracy = Math.round((correctChars / input.length) * 100);

    dispatch(setWPM(calculatedWPM || 0));
    dispatch(setCPM(calculatedCPM || 0));
    setElapsedTime(timeElapsed);
  };

  // Handle reset
  const handleReset = (wordCount = 10) => {
    dispatch(resetGame());
    initializeWords(wordCount);
    setProgress(0);
    setStartTime(null);
    setElapsedTime(0);
    setShowGraph(false);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // Focus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-screen mx-auto bg-gradient-to-b from-neutral-900 to-black min-h-screen text-white p-8 items-center">
      <CompetitorsProgress competitors={competitors} />
      <WordCountSelector handleReset={handleReset} />
      <PlayerProgressBar progress={progress} />
      <div className="relative w-full max-w-xl mx-auto">
        <RealTimeMetrics elapsedTime={elapsedTime} wpm={wpm} inputValue={inputValue} mistakes={mistakes} />
        <TextToType
          text={text}
          inputValue={inputValue}
          handleTyping={handleTyping}
          handleKeyPress={handleKeyPress} // Pass handleKeyPress here
          inputRef={inputRef}
        />
        <ResetButton handleReset={handleReset} />
        {showGraph && <PerformanceGraph chartData={chartData} chartOptions={chartOptions} />}
        <VirtualKeyboard activeKey={activeKey} handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default TypingGame;