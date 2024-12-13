import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cities from '../data/cities.json'
import SevenDayForecast from '../components/SevenDayForecast'
import HourlyForecast from '../components/HourlyForecast'
import {Container} from 'react-bootstrap'
import { useWeather } from '../context/WeatherContext'

const Details = () => {
    const {id} = useParams()
    const cityName = cities.filter((city) => city.id == id)[0].name
    const navigate = useNavigate();
    const {selectedCityForecast} = useWeather()
    const forecast = selectedCityForecast
    console.log(forecast)
    return (
        <div id='hero'>
            <Container className='text-center margin-xy-1 blurred-bg '>
            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
            <h1>{cityName}</h1>
            <Container className='half-width text-center margin-xy-1 blurred-bg dark-text'>
                <p>{forecast?.current?.condition?.text}</p>
                <h1>{(forecast?.current?.temp_c).toFixed(0)}°</h1> <img
                            src={forecast?.current?.condition?.icon}
                            alt={forecast?.current?.condition?.text}
                            style={{ width: '60px', height: '60px' }}
                        />
                <p>Feels like {(forecast?.current?.feelslike_c).toFixed(0)}°</p>
                <p>High {(forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c).toFixed(0)}° - Low {(forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c).toFixed(0)}°</p>
            </Container>
            <HourlyForecast cityName={cityName} forecast={forecast} />
            <SevenDayForecast cityName={cityName} forecast={forecast}/>
            
            </Container>
        </div>
        
    )
}

export default Details
