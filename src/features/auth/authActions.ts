import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
// import { ILoginFormValues } from "../../components/login/Login";
import { IUserData } from "./types/authType";

interface ILoginFormValues {
  username: string;
  password: string;
}

const tempData = {
  username: "emilys",
  password: "emilyspass"
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data: ILoginFormValues, thunkAPI) => {

    try {
      const response: AxiosResponse<IUserData> = await axios.post("https://dummyjson.com/auth/login", tempData);

      localStorage.setItem("user-token", response.data.token);

      return response.data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserWithToken = createAsyncThunk(
  "getUserWithToken",
  async (token: string, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.get(
        "https://dummyjson.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);