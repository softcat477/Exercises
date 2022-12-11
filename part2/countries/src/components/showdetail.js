import { useState, useEffect } from "react"
import axios from "axios"

const List = ({subtitle, callback}) => {
    return (
      <>
        <p>{subtitle}</p>
        <ul>
          {callback()}
        </ul>
      </>
    )
}
const Weather = ({country}) => {
    const [lat, lng] = country.capitalInfo.latlng
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`

    useEffect(() => {
        axios.get(weather_url)
             .then(response => {
                setWeather(response.data)
             })
      }, [weather_url])


    if (Object.keys(weather).length === 0){
        return (null)
    }
    else{
        const icon_url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
        return (
            <>
            <h3>Weather in {country.capital}</h3>
            <div><img src={icon_url} alt="weather icon"/>{weather.weather[0].main}</div>
            <div>Temperature: {weather.main.temp} Celsius</div>
            <div>Wind speed: {weather.wind.speed} m/s</div>
            </>
        )
    }
}
const ShowDetail = ({resultList}) => {
    if (resultList.length !== 1){
        return (
            <>
            </>
        )
    }
    else{
        const country = resultList[0]
        return (
        <>
            <h2>{country.name.common}</h2>
            <p>Population: {country.population.toLocaleString("en-US")}</p>
            <img src={country.flags.png} alt="country flag"/>

            <List subtitle="Capitals: " callback={() => (country.capital.map((x) => <li key={x}>{x}</li>))} />
            <List subtitle="Languages: " callback={() => (Object.values(country.languages).map((x) => <li key={x}>{x}</li>))} />
            <List subtitle="Timezones: " callback={() => (country.timezones.map((x) => <li key={x}>{x}</li>))} />
            <List subtitle="Continents: " callback={() => (country.continents.map((x) => <li key={x}>{x}</li>))} />
            <Weather country={country} />
        </>
        )
    }
}

export default ShowDetail