import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/dataSlice';
import loggerMiddleware from './features/middleware';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;