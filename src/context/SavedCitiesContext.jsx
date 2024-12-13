import { createContext, useContext } from 'react'
import { useLocalStorage } from 'react-use'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const SavedCitiesContext = createContext()

export default function SavedCitiesProvider ({ children }) {
  const [savedCities, setSavedCities] = useLocalStorage('savedCities', [])

  const addToSavedCities = (city) => {
    if (!savedCities.find((item) => item.id === city.id)) {
      setSavedCities([...savedCities, city])
      toast.success(`${city.name} has been added to your saved cities!`)
    } else {
      toast.info(`${city.name} is already in your saved cities.`)
    }
  }

  const removeCityFromSavedCities = (city) => {
    const updatedCities = savedCities.filter((item) => item.id !== city.id)
    setSavedCities(updatedCities)
    toast.success(`${city.name} has been removed from your saved cities!`)
  }

  return (
    <SavedCitiesContext.Provider value={{ savedCities, addToSavedCities, removeCityFromSavedCities }}>
      {children}
    </SavedCitiesContext.Provider>
  )
}

SavedCitiesProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useSavedCities () {
  return useContext(SavedCitiesContext)
}
