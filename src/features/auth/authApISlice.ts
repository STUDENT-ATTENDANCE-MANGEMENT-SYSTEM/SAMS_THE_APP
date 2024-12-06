import { apiSlice } from '../../api/apiSlice';
import { supabase } from '../../lib/supabase';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<
      { user: any; session: any },
      { email: string; password: string }
    >({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
        return { data };
      },
    }),
    signUp: builder.mutation<
      { user: any; session: any },
      {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: 'user' | 'admin';
        institutionCode?: string;
        title?: string;
        matricNumber?: string;
      }
    >({
      async queryFn({
        email,
        password,
        firstName,
        lastName,
        role,
        institutionCode,
        title,
        matricNumber,
      }) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              firstName,
              lastName,
              role,
              institutionCode,
              title,
              matricNumber,
            },
          },
        });
        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
        return { data };
      },
    }),
    signOut: builder.mutation<void, void>({
      async queryFn() {
        const { error } = await supabase.auth.signOut();
        if (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
        return { data: undefined };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  authApiSlice;
