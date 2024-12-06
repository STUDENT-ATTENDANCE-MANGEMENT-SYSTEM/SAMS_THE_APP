import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
