import { useEffect } from "react"

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
      return (
        <>
          {resultList.map((x) => <div key={x.name.common}>{x.name.common}</div>)}
        </>
      )
    }
}

export default ListCountries