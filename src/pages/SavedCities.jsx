import { Card, Button, Container } from 'react-bootstrap'
import { useSavedCities } from '../context/SavedCitiesContext'
import { useNavigate } from 'react-router-dom'
import "./SavedCities.css"



const SavedCities = () => {
    const { savedCities, addToSavedCities, removeCityFromSavedCities } = useSavedCities()  // Access saved cities from context
    const navigate = useNavigate()

    const handleNavigate = (city) => {
        // Navigate to the city details page
        navigate(`/details/${city.id}`)
    }


    const handleRemoveCity = (city) => {
        removeCityFromSavedCities(city)
    }


    return (
        <main>
            <section id='hero'>
<Container className='text-center margin-xy-1 blurred-bg ' >
                <h1>Saved Cities</h1>
                <div className="city-list">
                    {savedCities.length > 0 ? (
                        savedCities.map((city) => (
                            <Card key={city.id}>
                                <Card.Body>
                                    <div className='wrapper'>
                                        <div>
                                            <h3>{city.name}, {city.country}</h3>

                                        </div>
                                        <div className='btn-container'>
                                            <Button
                                                className="btn"
                                                onClick={() => handleNavigate(city)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                style={{ background: "rgb(170, 2, 2)" }}
                                                className="btn"
                                                onClick={() => handleRemoveCity(city)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No cities saved</p>
                    )}
                </div>
            </Container>
            </section>
            
        </main>

    )
}

export default SavedCities
