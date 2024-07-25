import SearchForm from '../searchForm/SearchForm'
import WeatherCard from '../weatherCard/WeatherCard'
import style from './homepage.module.css'

export default function Homepage() {
    return (
        <div className={style.page}>
            <div className={style.searchPanel}><SearchForm/></div>
        </div>
    )
}