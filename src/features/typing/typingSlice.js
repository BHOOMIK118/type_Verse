import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "The quick brown fox jumps over the lazy dog.",
  wpm: 0,
  cpm: 0,
  mistakes: 0,
  isTyping: false,
  inputValue: "",
  gameOver: false,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
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
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    resetGame: () => initialState,
  },
});

export const { setText, setWPM, setCPM, setMistakes, setIsTyping, setInputValue, setGameOver, resetGame } = typingSlice.actions;
export default typingSlice.reducer;