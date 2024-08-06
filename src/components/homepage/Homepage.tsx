import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SearchForm from '../searchForm/SearchForm'
import WeatherCard from '../weatherCard/WeatherCard'
import style from './homepage.module.css'
import { logoutUser } from '../../features/auth/authSlice';
import MyButton from '../myButton/MyButton';

export default function Homepage() {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    // console.log(links);

    const loginUser = () => {
        dispatch(loginUser())
    }

    const handleLogout = () => {
        //чистим браузерное хранилище данных
        localStorage.removeItem('user-token')

        //чистим state, выносим 'мусор' данных за пользователем
        dispatch(logoutUser())
    }

    if (user.token) {
        return (
            <div className={style.page}>
                <div className={style.searchPanel}><SearchForm /></div>
            </div>
        )
    } else {
        <MyButton name='login' onClick={loginUser() } />
    }

}


