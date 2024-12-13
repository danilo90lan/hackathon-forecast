import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cities from '../data/cities.json'
import SevenDayForecast from '../components/SevenDayForecast'
import HourlyForecast from '../components/HourlyForecast'
import { Container } from 'react-bootstrap'
import { useWeather } from '../context/WeatherContext'
import './Details.css'


const Details = () => {
    const { id } = useParams()
    const cityName = cities.filter((city) => city.id == id)[0].name
    const navigate = useNavigate();
    const { selectedCityForecast } = useWeather()
    const forecast = selectedCityForecast

    // Conditional rendering for  missing data
    if (!forecast) {
        return (
            <div>
                <Container>
                    <h2>Loading weather data...</h2>
                </Container>
            </div>
        );
    }


    return (
        <div id='hero'>
            <Container className='text-center margin-xy-1 blurred-bg '>
                <h1>{cityName}</h1>
                <Container className='half-width text-center margin-xy-1 blurred-bg dark-text'>
                    <div className="temp">
                        <p>{forecast?.current?.condition?.text}</p>
                        <h1>{(forecast?.current?.temp_c).toFixed(0)}°</h1>
                        <img
                            src={forecast?.current?.condition?.icon}
                            alt={forecast?.current?.condition?.text}
                            style={{ width: '80px', height: '80px' }}
                        />


                        <p>Feels like {(forecast?.current?.feelslike_c).toFixed(0)}°</p>
                        <p>High {(forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c).toFixed(0)}° - Low {(forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c).toFixed(0)}°</p>
                    </div>

                    


                </Container>
                <HourlyForecast cityName={cityName} forecast={forecast} />
                <SevenDayForecast cityName={cityName} forecast={forecast} />
                <div className="details">
                        <div className="details-card">
                            <h3>Precipitation </h3><p className="data">{forecast?.current?.precip_mm}mm</p>
                        </div>
                        <div className="details-card">
                            <h3>Wind </h3><p className="data"><span>{(forecast?.current?.wind_kph).toFixed(0)} kph</span><span className='small-text'>From {forecast?.current?.wind_dir}</span></p>
                        </div>
                        <div className="details-card">

                            <div className='sunrise'>
                                <i className="fas fa-sun"></i><p className="data"> {forecast?.forecast?.forecastday?.[0]?.astro?.sunrise}</p>
                            </div>
                            <div className='sunset'>    
                                <i className="fas fa-moon"></i><p className="data"> {forecast?.forecast?.forecastday?.[0]?.astro?.sunset}</p>
                            </div>
                        </div>
                        <div className="details-card">
                            <h3>UV Index </h3><p className="data">{(forecast?.current?.uv).toFixed(0)}</p>
                        </div>
                        <div className="details-card">
                            <h3>Humidity </h3><p className="data">{forecast?.current?.humidity}%</p>
                            <p><span className='dew-point'>{(forecast?.current?.dewpoint_c).toFixed(0)}°</span> Dew Point</p>
                        </div>
                        <div className="details-card">
                            <h3>Pressure </h3><p className="data pressure"><span>{forecast?.current?.pressure_in}</span><span className='inhg'> inHG</span></p>
                        </div>
                    </div>
            </Container>
        </div>

    )
}

export default Details
