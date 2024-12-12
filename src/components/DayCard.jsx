import React from 'react'
import { Card } from 'react-bootstrap'
import './DayCard.css'

const DayCard = ({ date, weekday, icon, condition, maxTemp, minTemp, rainPercentage }) => {
  return (
    <Card className='day-card'>
      <Card.Body className='day-card-body'>
        <p className='max-temp'><b>{maxTemp}°</b></p>
        <p className='min-temp'>{minTemp}°</p>

        <img
          src={icon}
          alt={condition}
          style={{ width: '60px', height: '60px' }}
        />
        {/* <p>{condition}</p> */}

        <p className='rain-percent'><b>{rainPercentage}</b></p>
        <h3>{date === new Date().toISOString().split('T')[0] ? 'Today' : weekday}</h3>
      </Card.Body>
    </Card>
  )
}

export default DayCard
