import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Spinner } from 'react-bootstrap'
import DayCard from './DayCard'

const SevenDayForecast = ({ cityName, forecast }) => {
  const forecastData = forecast?.forecast?.forecastday

  const getWeekday = (dateString) => {
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays[date.getDay()]
  }


  // Function to calculate rain percentage based on precipitation
  const getRainPercentage = (precipitation) => {
    // if precipitation > 0 means some rain
    if (precipitation > 0) {
      return `${Math.min(100, precipitation * 10)}%`
    }
    return '0%' // No rain
  }

  return (
    <div className='forecast box'>
      <h2 className='row'>7-day Forecast</h2>
      <div className='row forecast-container'>
        <div className='forecast-items'>
        {forecastData && forecastData.map((day, index) => {
          const weekday = getWeekday(day.date)

          // Get rain percentage from precipitation
          const rainPercentage = getRainPercentage(day.day.totalprecip_mm.toFixed(1))
          const today = new Date().toISOString().split('T')[0];
          
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <DayCard
                date={day.date === today ? "today" : day.date}
                weekday={weekday}
                icon={day.day.condition.icon}
                condition={day.day.condition.text}
                maxTemp={(day.day.maxtemp_c).toFixed(0)}
                minTemp={(day.day.mintemp_c).toFixed(0)}
                rainPercentage={rainPercentage}
              />
            </Col>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default SevenDayForecast
