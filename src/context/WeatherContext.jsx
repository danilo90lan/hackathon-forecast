// context/WeatherContext.js
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
    const [selectedCityForecast, setSelectedCityForecast] = useLocalStorage('selectedCityForecast', null);

    return (
        <WeatherContext.Provider value={{ selectedCityForecast, setSelectedCityForecast }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    return useContext(WeatherContext);
};

export default WeatherProvider