import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "The quick brown fox jumps over the lazy dog. Typing games are a fun way to improve your speed and accuracy. Practice makes perfect, and consistent effort leads to progress. Remember to keep your posture straight and your hands relaxed as you type. Accuracy is more important than speed, so take your time and focus on hitting the right keys. As you get better, your speed will naturally increase.",
  timeLeft: 60,
  wpm: 0,
  cpm: 0,
  mistakes: 0,
  isTyping: false,
  charIndex: 0,
  inputValue: "", // Tracks the user's current input
  gameOver: false,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setWPM: (state, action) => {
      state.wpm = action.payload;
    },
    setCPM: (state, action) => {
      state.cpm = action.payload;
    },
    setMistakes: (state, action) => {
      state.mistakes = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setCharIndex: (state, action) => {
      state.charIndex = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    resetGame: (state) => {
      state.timeLeft = 60;
      state.wpm = 0;
      state.cpm = 0;
      state.mistakes = 0;
      state.isTyping = false;
      state.charIndex = 0;
      state.inputValue = "";
    },
  },
});

export const {
  setText,
  setTimeLeft,
  setWPM,
  setCPM,
  setMistakes,
  setIsTyping,
  setCharIndex,
  setInputValue,
  setGameOver,
  resetGame,
} = typingSlice.actions;

export default typingSlice.reducer;
