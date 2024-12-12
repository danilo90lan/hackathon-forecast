import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import DayCard from '../components/DayCard';

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
        return (
            <div className="d-flex justify-content-center align-items-center">
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
            <h2 className="mb-5">7-day Forecast for {cityName}</h2>
            <Row className="g-3 justify-content-around">
                {forecast.forecastday.map((day, index) => {
                    const weekday = getWeekday(day.date);
                    const rainPercentage = `${(day.day.totalprecip_mm).toFixed(2)}%`;
                    return (
                        <Col xs={12} sm={6} md={4} lg={3} key={index}>
                            <DayCard
                                date={day.date}
                                weekday={weekday}
                                icon={day.day.condition.icon}
                                condition={day.day.condition.text}
                                maxTemp={day.day.maxtemp_c}
                                minTemp={day.day.mintemp_c}
                                rainPercentage={rainPercentage}
                            />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Forecast;