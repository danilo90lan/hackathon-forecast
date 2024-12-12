import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import cities from '../data/cities.json'
import SevenDayForecast from './SevenDayForecast'

const Details = () => {
    const {id} = useParams()
    const cityName = cities.filter((city) => city.id == id)
    console.log(cityName)

    useEffect(() => {
    })

    return (
        <div>
            <h1>{cityName[0].name}</h1>
            <SevenDayForecast cityName={cityName[0].name} />
        </div>
        
    )
}

export default Details
