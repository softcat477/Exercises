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
        </>
        )
    }
}

export default ShowDetail