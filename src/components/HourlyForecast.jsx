import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import HourCard from './HourCard'

const HourlyForecast = ({ cityName, forecast }) => {
  const forecastData = forecast?.forecast?.forecastday?.[0]?.hour

  // Function to calculate rain percentage based on precipitation
  const getRainPercentage = (precipitation) => {
    // if precipitation > 0 means some rain
    if (precipitation > 0) {
      return `${Math.min(100, precipitation * 100)}%`
    }
    return '0%' // No rain
  }

  return (
    <div className='forecast box'>
      <h2 className='row'>Hourly Forecast</h2>
      <Row className='forecast-row'>
        {forecastData && forecastData.map((hour, index) => {

          // Get rain percentage from precipitation
          const rainPercentage = getRainPercentage(hour.precip_mm)
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <HourCard
                date={hour.time}
                icon={hour.condition.icon}
                condition={hour.condition.text}
                maxTemp={(hour.temp_c).toFixed(0)}
                minTemp={(hour.temp_c).toFixed(0)}
                rainPercentage={rainPercentage}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default HourlyForecast
