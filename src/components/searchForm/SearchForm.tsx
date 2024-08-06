import MyButton from "../myButton/MyButton";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import styles from "./searchForm.module.css"
import WeatherCard, { IWeatherCardProps } from "../weatherCard/WeatherCard";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { fetchWeather } from "../../features/weather/weatherAction";

export interface IOneInputForm {
    inputValue: string
}

const schema = Yup.object().shape({
    inputValue: Yup
        .string()
        .max(70, 'value must be less than 20')
        .required('value is required')
})

const initialWeather: IWeatherCardProps = {
    
    "coord": {
        "lon": 0,
        "lat": 0
    },
    "weather": [
        {
            "id": 0,
            "main": "",
            "description": "",
            "icon": ""
        }
    ],
    "base": "",
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "humidity": 0,
        "sea_level": 0,
        "grnd_level": 0
    },
    "visibility": 0,
    "wind": {
        "speed": 0,
        "deg": 0
    },
    "clouds": {
        "all": 0
    },
    "dt": 0,
    "sys": {
        "type": 0,
        "id": 0,
        "country": "",
        "sunrise": 0,
        "sunset": 0
    },
    "timezone": 0,
    "id": 0,
    "name": "",
    "cod": 0
} 

export default function SearchForm() {

    const dispatch = useAppDispatch()

    // const [inputValue, setInputValue] = useState<string>('');

    const [fetchData, setFetchData] = useState<IWeatherCardProps>(initialWeather)
    //можно передавать formik пропсом
    const formik = useFormik({
        initialValues: {
            inputValue: ''
        } as IOneInputForm,
        validationSchema: schema,
        validateOnChange: true,
        onSubmit: (values: IOneInputForm, { resetForm }) => {
            // setInputValue(values.inputValue)
            // fetchWeather(values.inputValue);
            dispatch(fetchWeather(values))
            resetForm();
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.errors.inputValue ? <div className={styles.errorContainer}>{formik.errors.inputValue}</div> : null}
            <div className={styles.inputContainer}>
                <input
                    type="string"
                    placeholder="input city for search"
                    value={formik.values.inputValue}
                    onChange={formik.handleChange}
                    name="inputValue"
                />
                <MyButton type="submit" name="Search" />
            </div>
            <WeatherCard name={fetchData.name} weather={fetchData.weather} main={fetchData.main} />
        </form>
    )
}
