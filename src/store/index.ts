import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/gameSlice';
import messageReducer from '@/store/message';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    game: gameReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
