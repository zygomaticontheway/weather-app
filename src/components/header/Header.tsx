import { Link } from "react-router-dom"
import styles from "./header.module.css"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../features/auth/authSlice";

export default function Header() {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    // console.log(links);

    const handleLogout = () => {
        //чистим браузерное хранилище данных
        localStorage.removeItem('user-token')

        //чистим state, выносим 'мусор' данных за пользователем
        dispatch(logoutUser())
    }

    return (
        <header className={styles.header}>
            {user.username && <span>{user.username}</span>}
            {user.username ? (
                <>
                    <Link className={styles.naviWeatherApp} key='1' to='/'>Weather App</Link>
                    <div className={styles.naviHeader}>
                        <Link className={styles.naviHome} key='2' to='/'>Home</Link>
                        <Link className={styles.naviWeathers} key='3' to='/'>Weathers</Link>
                    </div>
                    <Link onClick={handleLogout} to='/'>logout</Link>
                </>
            ) : (

                <div className={styles.headerUnauthorizedText}>You have to login to find the weather</div>
            )}

        </header>
    )
}
