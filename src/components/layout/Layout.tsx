import { Outlet, useLocation } from 'react-router-dom'
import style from './layout.module.css'
import Header from '../header/Header'
import { getUserWithToken } from '../../features/auth/authActions'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'

export default function Layout() {

    const dispatch = useAppDispatch()

    useEffect(()=> {
        const token = localStorage.getItem('user-token')
        if (token !== null) {
            dispatch(getUserWithToken(token))
        }
    }, [])

    const location = useLocation()
    console.log(location.pathname);
    
    return (
        <div className={style.page}>
            <Header/>
            <main className={style.main}><Outlet/></main>
        </div>
    )
}