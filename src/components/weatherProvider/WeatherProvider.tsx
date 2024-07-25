import { Children, ReactNode, useState } from "react"
import { createContext } from "vm";

interface IWeatherContext{
    favorites: IWeatherData [];
    setFavorites: React.Dispatch<React.SetStateAction<IweatherData[]>>;
} 

const initioalContext: IWeatherContext ={
    favorites: [],
    setFavorites: () => {}
}

interface IWeatherProps{
    //типизация для оборачиваемых компонентов
    childreh: ReactNode
}

//этот объект контекст будет использоваться в компоненте-обертке ниже
export const WeatherContext = createContext(initioalContext)


export default function WeatherProvider({children}: IWeatherProps) {
  //эти данные я хочу сделать доступными во всех компонентах приложения
    const [favorites, setFavorites] = useState<IWeatherData[]>([])


    return (
        
        //передаем данные в контекст в объекте
        <WeatherContext.Provider value={{setFavorites, favorites}}>
            {/* на место children придут компоненты, кот мы обернем в provider  */}
            {children}
        </WeatherContext.Provider>

  )
}
