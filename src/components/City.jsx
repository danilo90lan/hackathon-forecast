import { Card, Button } from "react-bootstrap"


const City = ({ city, forecasts }) => {
    const forecast = forecasts.find((forecast) => forecast.id === city.id)
    const temp = forecast?.main?.temp 
    const convertToC = (temp - 273.15).toFixed(2)

    return (
            <Card className='mb-4'>
        <Card.Body>
            <Card.Title>
                {city?.name}, {city?.country}
            </Card.Title>
            <Card.Text>
              Temp: {convertToC} ⁰c
            </Card.Text>
            <Button>View Details</Button>
        </Card.Body>
    </Card>
    )
}

export default City