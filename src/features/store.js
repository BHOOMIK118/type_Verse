import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import typingReducer from '../features/typing/typingSlice';
// import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    typing: typingReducer,
    // leaderboard: leaderboardReducer
  }
});

export default store;

