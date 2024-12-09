import { Card, Button } from "react-bootstrap"
import {Link} from 'react-router-dom'
import './City.css'

const City = ({ city, forecasts }) => {
    const forecast = forecasts.find((forecast) => forecast.id === city.id)
    console.log(forecast)
    const temp = forecast?.main?.temp

    if (temp === NaN) return

    const convertToC = (temp - 273.15).toFixed(0)

    return (
        <Link>
        <Card className='my-2'>
            <Card.Body>
                <Card.Text class="weather-left">
                    <h3>{city?.name}, {city?.country}</h3>
                    <p>{forecast?.weather[0].main}</p>
                </Card.Text>
                <Card.Text className='temperature-display'>
                    {convertToC}°c
                </Card.Text>
            </Card.Body>
        </Card>
        </Link>
    )
}

export default City