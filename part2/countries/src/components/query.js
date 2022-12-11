const Query = ({query, setQuery}) => {
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }
  return (
    <>
        <p>
        Find countries: 
        <input value={query} onChange={handleQueryChange}/>
        </p>
    </>
  )
}

export default Query