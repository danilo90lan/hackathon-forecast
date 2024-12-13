import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import City from '../components/City'
import axios from 'axios'
import cities from '../data/cities.json'
import { Link } from 'react-router-dom'
import "./Home.css"

// import useSavedCities from '../context/SavedCitiesContext'
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const Home = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [closestCity, setClosestCity] = useState(null)
    //   const {savedCities} = useSavedCities()

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                    const data = response.data
                    setClosestCity(data)
                } catch (error) {
                    console.error('Error fetching weather data:', error)
                }
            })
        } else {
            console.log('Geolocation is not supported by this browser.')
        }
    }

    useState(() => {
        getUserLocation()
    }, [])

    const searchCities = async () => {
        if (!query) return
        console.log('Searching...')
        const results = await cities.filter((city) => {
            return city.name.toLowerCase().includes(query.toLowerCase())
        })
        setResults(results)
    }
    return (
        <main>
            <section id='hero'>
                <Container className='text-center margin-xy-1 blurred-bg '>
                    <h1>Weather</h1>
                    <h2>Current Location</h2>
                    {closestCity && <City city={{ name: closestCity.name, country: closestCity.sys.country, id: closestCity.id }} />}
                    <h2>Search Cities</h2>
                    <Form>
                        <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Button type='button' onClick={searchCities}>Search</Button>
                    </Form>
                    <div className='cities'>
                        {results && (
                            results.map((result) => <City key={result.id} city={result} />)
                        )}

                    </div>



                    {/* {savedCities && (
                <>
                <h2>Saved Cities</h2>
                {savedCities.map((city) => <City key={city.id} city={city} forecasts={forecasts} />)}
                </>
            )} */}
                </Container>
            </section>
        </main>

    )
}

export default Home
