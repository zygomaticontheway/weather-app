import { Link } from "react-router-dom"
import styles from "./header.module.css"

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <Link className={styles.naviWeatherApp} key='1' to='/'>Weather App</Link>
                <div className={styles.naviHeader}>
                <Link className={styles.naviHome} key='2' to='/'>Home</Link>
                <Link className={styles.naviWeathers}  key='3' to='/'>Weathers</Link>    
                </div>
            </header>
        </>
    )
}
