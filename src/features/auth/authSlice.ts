import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';
import { RootState } from '../../store';

interface AuthState {
  user: User | null;
  session: any;
  role: 'user' | 'admin' | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    setRole: (state, action: PayloadAction<'user' | 'admin' | null>) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setSession, setRole } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectSession = (state: RootState) => state.auth.session;
export const selectRole = (state: RootState) => state.auth.role;

export default authSlice.reducer;
