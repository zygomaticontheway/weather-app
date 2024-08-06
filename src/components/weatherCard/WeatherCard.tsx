import { useAppSelector } from "../../redux/hooks"
import styles from "./weatherCard.module.css"

export interface IWeatherCardProps {
    coord?: {
        lon: number,
        lat: number
    },
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
    }],
    base?: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility?: number,
    wind?: {
        speed: number,
        deg: number
    },
    clouds?: {
        all: number,
    },
    dt?: number,
    sys?: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone?: number,
    id?: number,
    name: string,
    cod?: number
}

export default function WeatherCard({ name, weather, main }: IWeatherCardProps) {

    const { weathers } = useAppSelector(state => state.weathers);
    const weatherIcon = `http://openweathermap.org/img/w/${weathers.weather[0].icon}.png`
    const temperatureCelsius  = Math.floor(weathers.main.temp - 273.15)

    //button SAVE 

    //button DELETE

    return (
        <div className={styles.card}>
            <div className={styles.temperatureAndCloudsContainer}>
                <div className={styles.temperature}>{temperatureCelsius}°</div>
                <div className={styles.clouds}>
                    <img src={weatherIcon} alt={weathers.weather[0].description} />
                    <img src={weatherIcon} alt={weathers.weather[0].description} />
                    <img src={weatherIcon} alt={weathers.weather[0].description} />
                </div>
                <div className={styles.city}>{weathers.name}</div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.save}>Save</button>
                <button className={styles.delete}>Delete</button>
            </div>
        </div>
    )
}
