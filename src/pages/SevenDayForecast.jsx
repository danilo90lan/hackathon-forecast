import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Spinner } from 'react-bootstrap'
import DayCard from '../components/DayCard'

const SevenDayForecast = ({ cityName }) => {
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_KEY = 'e05d694d41514a7b861114121241112'

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no`)
        setForecastData(response.data)
        setLoading(false)
      } catch (err) {
        console.err('Failed to fetch forecast data', err)
        setLoading(false)
      }
    }

    fetchForecast()
  }, [cityName])

  const getWeekday = (dateString) => {
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays[date.getDay()]
  }

  if (loading) {
    return (
      <div>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (!forecastData) {
    return <div>No data available</div>
  }

  const { forecast } = forecastData

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
      <h2 className='row'>7-day Forecast for {cityName}</h2>
      <Row>
        {forecast.forecastday.map((day, index) => {
          const weekday = getWeekday(day.date)

          // Get rain percentage from precipitation
          const rainPercentage = getRainPercentage(day.day.totalprecip_mm.toFixed(1))
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <DayCard
                date={day.date}
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
      </Row>
    </div>
  )
}

export default SevenDayForecast
