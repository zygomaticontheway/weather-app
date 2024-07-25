import MyButton from "../myButton/MyButton";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import styles from "./searchForm.module.css"
import WeatherCard, { IWeatherCardProps } from "../weatherCard/WeatherCard";

interface IOneInputForm {
    inputValue: string
}

const schema = Yup.object().shape({
    inputValue: Yup
        .string()
        .max(70, 'value must be less than 20')
        .required('value is required')
})



export default function SearchForm() {

    const [inputValue, setInputValue] = useState<string>('');
    const [fetchData, setFetchData] = useState<IWeatherCardProps>({
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
    })
//можно передавать formik пропсом
    const formik = useFormik({
        initialValues: {
            inputValue: ''
        } as IOneInputForm,
        validationSchema: schema,
        validateOnChange: true,
        onSubmit: (values: IOneInputForm, { resetForm }) => {
            setInputValue(values.inputValue)
            fetchWeather(values.inputValue);
            resetForm();
        }
    })

    const weatherApiKey = '7ba1af66c795b408df111caae346c830';
    const searchItem = { inputValue };

    const fetchWeather = async (searchItem: string) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=${weatherApiKey}`)
        const data = await res.json()
        setFetchData(data);

        // setWeatherData(data); дописать отдельный компонент карточки WeatherCard.tsx
    }

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
            <WeatherCard name={fetchData.name } weather={fetchData.weather} main={fetchData.main } />
        </form>
    )
}
