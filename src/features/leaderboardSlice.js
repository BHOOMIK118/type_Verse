import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
  filter: 'all-time',
  mode: 'All Modes',
  searchTerm: '',
  status: 'idle',
  error: null,
};

export const fetchLeaderboardData = createAsyncThunk(
  'leaderboard/fetchData',
  async () => {
    const mockData = [
      { id: 1, name: 'Buriza', wpm: 174, accuracy: 100, time: '4s', mode: 'words' },
      { id: 2, name: 'Ritik Sahni', wpm: 122, accuracy: 100, time: '6s', mode: 'words' },
      { id: 3, name: 'Hemant', wpm: 99, accuracy: 100, time: '7s', mode: 'words' },
      { id: 4, name: 'jaydeep patil', wpm: 98, accuracy: 100, time: '8s', mode: 'words' },
      { id: 5, name: 'Just Some Guy without a Mustache', wpm: 93, accuracy: 100, time: '8s', mode: 'words' },
      { id: 6, name: 'Akash Kamle', wpm: 87, accuracy: 96.65, time: '8s', mode: 'words' },
      { id: 7, name: 'Sanjay Jaiswal', wpm: 81, accuracy: 100, time: '9s', mode: 'words' },
    ];
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData;
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch leaderboard data';
      });
  },
});

export const { setFilter, setMode, setSearchTerm } = leaderboardSlice.actions;
export const selectLeaderboard = (state) => state.leaderboard;
export default leaderboardSlice.reducer;