import { useEffect, useState } from "react"
import ShowDetail from "./showdetail"

const SingleCountry = ({country}) => {
    const [isOpened, setIsOpened] = useState(false)
    return (
        <>
            <div>{country.name.common + " "} 
                <button onClick={() => setIsOpened(!isOpened)}>
                    {isOpened? "Close": "Open"}
                </button>
            </div>
            {isOpened && 
                <ShowDetail resultList={[country]} />
            }
        </>
    )
}

const ListCountries = ({query, countryList, resultList, setResultList}) => {
    const searchCountries = () => {
      const new_result_list = countryList.filter((x) => x.name.common.toLowerCase().includes(query.toLowerCase()))
      if (query.length !== 0){
        setResultList(new_result_list)
      }
      else{
        setResultList([])
      }
    }
  
    useEffect(searchCountries, [query, countryList])
  
    if (resultList.length > 10){
      return (
        <>
          <div>Too many matches, specify another filter</div>
        </>
      )
    }
    else if (resultList.length === 1){
      return (
        <>
        </>
      )
    }
    else{
        //{resultList.map((x) => <div key={x.name.common}>{x.name.common} button_placeholder</div>)}
        return (
            <>
                {resultList.map((x) => <SingleCountry key={x.name.common} country={x} />)}
            </>
        )
    }
}

export default ListCountries