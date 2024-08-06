import { createSlice } from "@reduxjs/toolkit";
import { IWeatherCardProps } from "../../components/weatherCard/WeatherCard";
import { fetchWeather } from "./weatherAction";

interface IWeatherState {
  weathers: IWeatherCardProps;
  isLoading: boolean;
  error: string;
}
const initialWeathers: IWeatherCardProps = {
    weather: [{
        id: 0,
        main: "",
        description: "",
        icon: ""
    }],
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0
    },
    name: ""
}

const initialState: IWeatherState = {
  weathers: initialWeathers,
  isLoading: false,
  error: "",
};


export const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {
    cleanWeathers: (state) => {
      state.weathers = initialWeathers;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weathers = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.weathers = initialWeathers;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice;
export const { cleanWeathers } = weatherSlice.actions
