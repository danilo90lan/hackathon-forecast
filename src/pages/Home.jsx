import { useState } from "react"
import { Container, Form, InputGroup, Button } from "react-bootstrap"
import City from '../components/City'
import axios from 'axios'
import cities from '../data/cities.json'
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [forecasts, setForecasts] = useState([])

    const searchCities = async () => {
        if(!query) return
        console.log('Searching...')
        const results = await cities.filter((city) => {
            return city.name.toLowerCase().includes(query.toLowerCase())
        })
        setResults(results)

        results.forEach(async (result) => {
            const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params:{
                    q: result.name,
                    appid: apiKey
                }
            })
            const data = response.data
            setForecasts(prev=> [...prev, data])
        })
        
    }
    return(
        <Container className='text-center'>
            <h1>Home</h1>
            <Form>
                <input type='text' placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button variant='primary' type='button' className='mx-2' onClick={searchCities}>Search</Button>
            </Form>

            {results && (
                 results.map((result) => <City key={result.id} city={result} forecasts={forecasts} />)
            )}
        </Container>
        
    )
}

export default Home