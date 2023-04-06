import { useState, useEffect } from "react"; 
import './App.css';

function App() {
  const [report, setReport]=useState({description:null});
  const [city, setCity]=useState("warrington");
  const [errMsg, setErrMsg]=useState(null);
  const [strDescription, setstrDescription]=useState("");
  const [arrForecast, setarrForecast]=useState([]);


  const handleEdit=(e)=>{    
    setCity(e.target.value);
    console.log("edit", city);
  };

  const fetchReport = async () =>{
    let strRequestedTown = city;
    if (!strRequestedTown == null || !strRequestedTown ==""){
      console.log("Requsted Town", strRequestedTown);
      let strRequest = "https://goweather.herokuapp.com/weather/" + strRequestedTown
      try{
          const response = await fetch(strRequest);//can't put "no-cors" in this without creating error?????
          //without "no-cors", response is buggy and intermitant

        if (!response.ok){
          throw new Error(response.statusText);
        }else{
          const weatherData =  await response.json();
          console.log(weatherData);
          setReport(weatherData);
          setarrForecast(weatherData.forecast);
          if (report.description === "" || report.description === null){
            console.log("No Data section");
            setstrDescription("Could not find any data for "+ city);
          }else{
            console.log("data section");
            setstrDescription("The weather for " + city + " is " + report.description);
          } 
        }
      }catch(err){
        console.log("Error:", err);
        setErrMsg("Data not found");
      }
    };
  }  
  useEffect(() => {
    console.log("fetch");
    fetchReport();
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input type="text" id="textContent" key="textInput" onChange={handleEdit} value={city}>
      </input>    <input type="submit" value="submit" onClick={fetchReport}></input>
      <p>{strDescription}</p>
      <br></br><br></br>  
      <h2>Forecast</h2>
      <div id ="forecast">
        {arrForecast.map((rep, index) => (
          <ForecastList 
              key={index}
              day={rep.day}
              temp={rep.temperature}
              wind={rep.wind}
          />
        ))}
      </div>
    </div>
  );
}
const ForecastList=(props)=>{
  return(
    <div>Day + {props.day}<br></br>{props.temp}<br></br>{props.wind}</div>
  );
};
  
export default App;
