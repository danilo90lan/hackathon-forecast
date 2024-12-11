import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const Forecast = ({ cityName }) => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "e05d694d41514a7b861114121241112"; 

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no`);
                setForecastData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch forecast data');
                setLoading(false);
            }
        };

        fetchForecast();
    }, [cityName]);

    const getWeekday = (dateString) => {
        const date = new Date(dateString);
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[date.getDay()];
    };

    if (loading) {
        return <div>Loading forecast...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!forecastData) {
        return <div>No data available</div>;
    }

    const { forecast } = forecastData;

    return (
        <div className="forecast">
            <h3>7-day Forecast for {cityName}</h3>
            <Row className="g-3 justify-content-around">
                {forecast.forecastday.map((day, index) => {
                    const weekday = getWeekday(day.date);
                    return (
                        <Col xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card className="h-100 rounded-3 shadow-sm bg-white">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">{weekday}</h5>
                                        <h5 className="mb-0">{day.date}</h5>
                                    </div>
                                    <img 
                                        src={day.day.condition.icon} 
                                        alt={day.day.condition.text} 
                                        className="my-2" 
                                        style={{ width: '60px', height: '60px' }} // Smaller icon size
                                    />
                                    <p>{day.day.condition.text}</p>
                                    <p><strong>Max Temp:</strong> {day.day.maxtemp_c}°C</p>
                                    <p><strong>Min Temp:</strong> {day.day.mintemp_c}°C</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Forecast;
