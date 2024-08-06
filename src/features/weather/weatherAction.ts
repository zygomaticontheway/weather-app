import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOneInputForm } from "../../components/searchForm/SearchForm";

const weatherApiKey = "7ba1af66c795b408df111caae346c830";

export const fetchWeather = createAsyncThunk(
  "fetchWeather",
  async (data: IOneInputForm, thunkAPI) => {
    console.log("data:", data);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.inputValue}&appid=${weatherApiKey}`
      );
      return response.data;
      console.log("response data:", response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
