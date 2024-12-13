import React from 'react'
import { Card } from 'react-bootstrap'
import './HourCard.css'

const HourCard = ({ date, weekday, icon, condition, maxTemp, minTemp, rainPercentage }) => {
    const time = date.split(' ')[1];
  
  
    return (
    <Card className='hour-card'>
      <Card.Body className='hour-card-body'>
       
        <p className='max-temp'><b>{maxTemp}°</b></p>
        <img
          src={icon}
          alt={condition}
          style={{ width: '60px', height: '60px' }}
        />

        <p className='rain-percent'><b>{rainPercentage}</b></p>
        <h3>{time}</h3>
      </Card.Body>
    </Card>
  )
}

export default HourCard
