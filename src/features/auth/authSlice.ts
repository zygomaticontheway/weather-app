import { createSlice } from "@reduxjs/toolkit";

//импортируем типизацию ответа user(пользовательских данных)
import { IUserData } from "./types/authType";
import { getUserWithToken, loginUser } from "./authActions";

//типизация state
interface IUserState {
  user: IUserData;
  isLoading: boolean;
  error: string;
}

//начальное значение для user
const initialUser: IUserData = {
  id: 0,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: "",
  token: "",
  refreshToken: "",
};

//создаем state и передаем нач значение user
const initialState: IUserState = {
  user: initialUser,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({

  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialUser;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserWithToken.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default authSlice;

export const { logoutUser } = authSlice.actions;
