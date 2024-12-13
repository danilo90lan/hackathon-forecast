import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog } from 'react-icons/fa'
import { useSavedCities } from '../context/SavedCitiesContext'
import { Card, Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useWeather } from '../context/WeatherContext'

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY
import './City.css'

const City = ({ city }) => { // Use a regular function component with props
    const [loading, setLoading] = useState(true);
    const [timeoutError, setTimeoutError] = useState(false);
    const { savedCities, addToSavedCities } = useSavedCities();
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { setSelectedCityForecast } = useWeather()

    const isSaved = savedCities.some((item) => item.id === city.id);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // Your API call here
                const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
                    params: {
                        key: API_KEY,
                        q: city.name,
                        days: 7
                    }
                });
                setForecast(response.data);
            } catch (err) {
                setError(err)
                setTimeoutError(true); // Set timeout error on failure
            } finally {
                setLoading(false);
            }
        };

        fetchForecast(); // Call the async function

    }, [city.name]); // Add city.name to dependency array


    if (timeoutError) {
        return false
    }

    if (loading) {
        return (
            <Card className='my-4 shadow-sm p-3'>
                <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                    <Spinner animation='border' variant='primary' className='mb-3' />
                    <Card.Text className='text-center text-muted'>Loading forecast...</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    const handleClick = () => {
        console.log(forecast)
        setSelectedCityForecast(forecast)
        navigate(`/details/${city.id}`)
    }

    const handleSaveCity = (event) => {
        // Prevent handleClick from being triggered
        event.stopPropagation();
        addToSavedCities(city)  // Add city to saved cities list
    }

    const condition = forecast?.current?.condition?.text
    const icon = forecast?.current?.condition?.icon
    const tempC = (forecast?.current?.temp_c).toFixed(0)

    return (
        <div onClick={handleClick}>
            <Card className='my-2 city-card'>
                <Card.Body className='city-card-body'>
                    <span className='weather-icon ms-3'>
                        <img
                            src={icon}
                            alt={condition}
                            style={{ width: '60px', height: '60px' }}
                        />
                    </span>
                    <div className='weather-left'>
                        <h3>{city?.name}, {city?.country}</h3>
                        <p>{condition}</p>
                    </div>
                    <Card.Text className='temperature-display'>
                        {tempC}°C
                    </Card.Text>

                    <Button  className={"save"} 
                    onClick={handleSaveCity}
                    disabled={isSaved}>
                        {`${isSaved ? "Added" : "Save"}`}
                    </Button>

                </Card.Body>

            </Card>
        </div>
    )
}
export default City
