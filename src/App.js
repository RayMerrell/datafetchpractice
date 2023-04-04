import { useState, useEffect } from "react"; 
import './App.css';

function App() {
  const [report, setReport]=useState({description:null});
  const [city, setCity]=useState("warrington");
  const [errMsg, setErrMsg]=useState(null);
  const [strReturn, setstrReturn]=useState("");

  const handleEdit=(e)=>{
    console.log("edit");
    setCity(e.target.value);
  };

  const fetchReport = async () =>{
    let strRequestedTown = city;
    if (!strRequestedTown == null || !strRequestedTown ==""){
      console.log("Requsted Town", strRequestedTown);
      let strRequest = "https://goweather.herokuapp.com/weather/" + strRequestedTown
      try{
        const response = await fetch(strRequest);
        if (!response.ok){
          throw new Error(response.statusText);
        }
        const weatherData =  await response.json();
        console.log(weatherData);
        setReport(weatherData);
        console.log("shit",report.description);
        if (report.description === "" || report.description === null){
          console.log("No Data section");
          setstrReturn("Could not find any data for "+ city);
        }else{
          console.log("data section");
          setstrReturn("The weather for " + city + " is " + report.description);
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
      </input><input type="submit" value="submit" onClick={fetchReport}></input>
      <p>{strReturn}</p>
    </div>
  );
}

export default App;
