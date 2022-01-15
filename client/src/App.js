import React, { useState } from "react"
import "./App.css";

function App() {

  const [country, setCountry] = useState("");
  const [weatherValues, setWeatherValues] = useState(
    {
      degree: "",
      name: "",
      main: "",
      description: "",
      url: ""
    }
  )

  const getData = async () => {
    const rawData = await fetch(`https://weather-app-38.herokuapp.com/api/${country}`)

    if (rawData.status === 404) {
      setWeatherValues({
        name: "Something went wrong",
        degree: `Your input was: ${country}`,
      })
      console.log("Error");
    } else {

      const data = await rawData.json();
      let degree = parseInt(data.main.temp);
      let iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}` + ".png";
      setWeatherValues({
        name: data.name,
        degree: degree,
        main: data.weather[0].main,
        description: data.weather[0].description,
        url: iconURL
      })
    }
  }

  const inputValidation = (event) => {
    let text = event.target.value;
    text = text.replace(/[0-9]/g, '');
    text = text.replace(/[^\w\s]/gi, '');
    setCountry(text);
  }

  const handleClick = (event) => {
    getData();
    setCountry("");
    event.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <input onChange={inputValidation} type="text" placeholder="Search" value={country} autofocus="autofocus"></input>
        <button onClick={handleClick}>&#10148;</button>
      </form>
      <h1>{weatherValues.name}</h1>
      <h2>{weatherValues.degree}</h2>
      <h2>{weatherValues.main}</h2>
      <h3>{weatherValues.description}</h3>
      <img src={weatherValues.url} alt=""></img>
    </div>
  );
}

export default App;