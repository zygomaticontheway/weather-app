import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SearchForm from '../searchForm/SearchForm'
import style from './homepage.module.css'
import MyButton from '../myButton/MyButton';
import { loginUser } from '../../features/auth/authActions';

export default function Homepage() {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // console.log(links);

    const tempData = {
        username: "emilys",
        password: "emilyspass"
    };

    const tempLoginUser = () => {
        dispatch(loginUser(tempData))
            .then(() => {
                navigate('/')
            });
    };

    if (user && user.token) {
        return (
            <div className={style.page}>
                <div className={style.searchPanel}><SearchForm /></div>
            </div>
        )
    } else {
        return (
            <div>
                <MyButton name='login' onClick={tempLoginUser} />
            </div>
        )
    }
}
