import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

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

    const getRainPercentage = (precipitation) => {
        // This assumes precipitation > 0 means some rain, you can adjust based on your needs
        if (precipitation > 0) {
            return `${Math.min(100, precipitation * 10)}%`; // Adjust this scale as needed
        }
        return "0%"; // No rain
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
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
                    const rainPercentage = getRainPercentage(day.day.totalprecip_mm.toFixed(1)); // Get rain percentage from precipitation
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
                                        style={{ width: '40px', height: '40px' }} // Smaller icon size
                                    />
                                    <p>{day.day.condition.text}</p>
                                    <p><strong>Max Temp:</strong> {day.day.maxtemp_c}°C</p>
                                    <p><strong>Min Temp:</strong> {day.day.mintemp_c}°C</p>
                                    <p><strong>Chance of Rain:</strong> {rainPercentage}</p> {/* Added rain percentage */}
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
