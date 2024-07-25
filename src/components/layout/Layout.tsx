import { Outlet } from 'react-router-dom'
import style from './layout.module.css'
import Header from '../header/Header'

export default function Layout() {
    return (
        <div className={style.page}>
            <Header/>
            <main className={style.main}><Outlet/></main>
        </div>
    )
}