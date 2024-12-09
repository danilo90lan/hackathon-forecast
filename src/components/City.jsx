//import icons
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog } from 'react-icons/fa';
import { useSavedCities } from '../context/SavedCitiesContext';
import { Card, Button, Spinner } from "react-bootstrap"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './City.css'


const City = ({ city, forecasts }) => {
    const forecast = forecasts.find((forecast) => forecast.id === city.id);
    const [loading, setLoading] = useState(true);
    const [timeoutError, setTimeoutError] = useState(false);
    const {savedCities, addToSavedCities} = useSavedCities()

    // The useEffect runs when the loading state changes.
    // Set a timer for 10 seconds for the loading phase. 
    // If forecast is not available the "Loading forecast" string is not longer displayed
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setTimeoutError(true);
            }
        }, 10000); // 10 seconds

        // Clear the timer if the forecast is fetched on time
        return () => clearTimeout(timer);
    }, [loading]);

    // When the forecast is found set the state to false
    useEffect(() => {
        if (forecast) {
            setLoading(false);
        }
    }, [forecast]);

    // If forecast is not available and loading is still true after 10 seconds
    if (timeoutError) {
        console.warn(`Forecast not available for ${city.name}`);
        return false;
    }


    // Display the loading spinner
    if (loading) {
        return (
            <Card className="my-4 shadow-sm p-3">
                <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                    <Spinner animation="border" variant="primary" className="mb-3" />
                    <Card.Text className="text-center text-muted" >Loading forecast...</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    const temp = forecast?.main?.temp;


    if (temp === NaN) return null;

    
    // Select weather icon based on the weather type
    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'Clear':
                return <FaSun />;
            case 'Clouds':
                return <FaCloud />;
            case 'Rain':
                return <FaCloudRain />;
            case 'Snow':
                return <FaSnowflake />;
            case 'Fog':
                return <FaSmog />;
        }
    };

    const convertToC = (temp - 273.15).toFixed(0);
    return (

        <Link>
            <Card className='my-2'>
                <Card.Body>
                <span className="weather-icon ms-3">
                            {getWeatherIcon(forecast?.weather?.[0]?.main)}
                        </span>
                
                    <div className="weather-left">
                   
                        <h3>{city?.name}, {city?.country}</h3>
                        <p>
                                    {forecast?.weather?.[0]?.main}
                        </p>
                    </div>
                    <Card.Text className='temperature-display'>
                        {convertToC}°c
                        
                    </Card.Text>
                    <Button variant='primary' onClick={() => addToSavedCities(city)}>Save</Button>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default City