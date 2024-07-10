import { GameState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: GameState = {
    board: {
        id: 'board-1',
        slots: [],
    },
    history: [],
    currentTurn: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (state) => {
      console.log("Game Init");
    },
  },
});

export const { initializeGame } = gameSlice.actions;
export default gameSlice.reducer;