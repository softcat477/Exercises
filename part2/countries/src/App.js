import axios from "axios";
import { useState, useEffect } from "react";

import ShowDetail from "./components/showdetail";
import ListCountries from "./components/listcountries";
import Query from "./components/query";

function App() {
  const [query, setQuery] = useState("")
  const [countryList, setCountryList] = useState([])
  const [resultList, setResultList] = useState([])

  // Get country list using the v3.1 API
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
         .then(response => {
          setCountryList(response.data)
         })
  }, [])

  return (
    <>
      <h1>Find countries</h1>
      <Query query={query} setQuery={setQuery}/>
      <ListCountries query={query} 
                     countryList={countryList}
                     resultList={resultList}
                     setResultList={setResultList} />
      <ShowDetail resultList={resultList} />
    </>
  );
}

export default App;
