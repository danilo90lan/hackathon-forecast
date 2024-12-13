import { useSavedCities } from '../context/SavedCitiesContext'
import { Card, Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useWeather } from '../context/WeatherContext'
import PropTypes from 'prop-types'

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
        setSelectedCityForecast(forecast)
        navigate(`/details/${city.id}`)
    }

    const handleSaveCity = (event) => {
        // Prevent handleClick from being triggered
        event.stopPropagation();
        addToSavedCities(city)  // Add city to saved cities list
    }

    const condition = forecast?.current?.condition?.text || '';
    const icon = forecast?.current?.condition?.icon || '';
    const tempC = forecast?.current?.temp_c 
    ? (forecast.current.temp_c).toFixed(0)
    : '';

    //If forecast is null or undefined, prevent errors by setting defaults
    if (!forecast) return <p>No forecast data available</p>;


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
                        {tempC}°
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

City.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
    }).isRequired
}
export default City
