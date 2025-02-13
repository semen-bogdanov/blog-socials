import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

// export interface FetchUserDataAction extends PayloadAction<any> {
//   type: string;
// }

export interface AuthState {
  data: any | null;
  status: 'loading' | 'loaded' | 'error';
}

// получение информации из полей - Вход в личный кабинет
// в params хранится email и пароль
export const fetchAuth = createAsyncThunk<any, any>('auth/fetchAuth', async (params: any) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk<any, any>(
  'auth/fetchRegister',
  async (params: any) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk<any>('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'loading',
  } as AuthState,
  reducers: {
    // выход из аккаунта
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchAuth.rejected, (state, { error }) => {
        console.error(error);
        state.data = null;
        state.status = 'error';
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state, { error }) => {
        state.status = 'error';
        state.data = null;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
