// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sizeReducer from './slice/sizeSlice';

const store = configureStore({
    reducer: {
        size: sizeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
