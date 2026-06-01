import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [txt,setTxt] = useState("")
  const [d,setd] = useState([])
  const url = "https://studies.cs.helsinki.fi/restcountries/api/"

  useEffect(()=>{
    axios
      .get(url+"all")
      .then(r=>setd(r.data))
  },[])

  return (
    <div>
      find countries <input value={txt} onChange={(e)=>setTxt(e.target.value)}/>
      <Result seti={setTxt} term={txt} data={d}/>
    </div>
  )

}


const Result = ({seti,term,data}) => {

  if(term===null||term==="") return(<div></div>)


  let filteredCountries = data.filter((element) =>
    element.name.common.toLowerCase().includes(term.toLowerCase())
  );


  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  else if (filteredCountries.length === 1) {
    let c = filteredCountries[0];
      return(
        <div>
        <h2>{c.name.common||c.name.official}</h2>
        <p>Capital {c.capital[0]}</p><p>Area {c.area}</p>
        
        <h3>Languages</h3>
        <ul>
          {
            Object.values(c.languages).map((l)=>{return(
              <li key={l}>{l}</li>
            )})
          }
        </ul>
        <img width="50%" src={c.flags.svg} alt={c.flags.alt} style={{border:"1px dashed lightgray"}}/>
        <h3>Weather in {c.capital[0]}</h3>
        <Weather city={Object.values(c.capitalInfo)}/>
      </div>);
  }
  
  else{
  return(
    <ul>
      {filteredCountries.map(p=>{
        return(<li key={p.ccn3}>{p.name.common||p.name.official} <button onClick={()=>{
          seti(p.name.common||p.name.official)
        }}>show</button></li>) 
      })}
    </ul>
  )
}
}

const Weather = ({city})=>{

const api_key = import.meta.env.VITE_SOME_KEY

useEffect(()=>{
  {console.log(city[0],city[1])}
  axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city[0][0]}&lon=${city[0][1]}&exclude=minutely,hourly,daily,alerts&appid=${api_key}`).then(
    (res)=>{
      return(
       <>
        Temperature {res.data.current.temp} Celcius
        <img alt="weather icon" src={`https://openweathermap.org/payload/api/media/file/${res.data.weather.icon}.png`}/>
        Wind {res.data.current.wind_speed} m/s
       </>
      )
    }
  )
},[]);



}

export default App;
