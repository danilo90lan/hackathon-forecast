import React from 'react';
import { Card } from 'react-bootstrap';

const DayCard = ({ date, weekday, icon, condition, maxTemp, minTemp, rainPercentage }) => {
    return (
        <Card className="h-100 rounded-3 shadow-sm bg-white">
            <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{weekday}</h5>
                    <h5 className="mb-0">{date}</h5>
                </div>
                <img
                    src={icon}
                    alt={condition}
                    className="my-2"
                    style={{ width: '60px', height: '60px' }}
                />
                <p>{condition}</p>
                <p><strong>Max Temp:</strong> {maxTemp}°C</p>
                <p><strong>Min Temp:</strong> {minTemp}°C</p>
                <p><strong>Chance of Rain:</strong> {rainPercentage}</p>
            </Card.Body>
        </Card>
    );
};

export default DayCard;