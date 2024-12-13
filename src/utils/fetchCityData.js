const searchForCities = async (query) => {
    const forecasts = []
    const results = await cities.filter((city) => {
        return city.name.toLowerCase().includes(query.toLowerCase())
      })
      results.forEach(async (result) => {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: result.name,
            appid: API_KEY
          }
        })
        const data = response.data
        forecasts.append(data)
      })

}