import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/gameSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
