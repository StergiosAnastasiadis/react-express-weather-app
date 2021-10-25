import React, { useState } from "react"
import "./App.css";

function App() {

  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [main, setMain] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const getData = async () => {
    const rawData = await fetch(`http://localhost:5000/api/${country}`)

    if (rawData.status === 404) {
      setName("Something went wrong");
      setDegree(`Your input was: ${country}`);
      setMain("");
      setDescription("");
      setUrl("");
      console.log("Error");
    } else {

      const data = await rawData.json();

      setName(data.name);
      let degree = data.main.temp;
      degree = parseInt(data.main.temp - 272.15);
      setDegree(degree + " °C");
      setMain(data.weather[0].main);
      setDescription(data.weather[0].description);
      let x = `http://openweathermap.org/img/wn/${data.weather[0].icon}` + ".png";
      setUrl(x);
    }
  }

  function inputValidation(event) {
    let text = event.target.value;
    text = text.replace(/[0-9]/g, '');
    setCountry(text);
  }

  function handleClick(event) {
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
      <h1>{name}</h1>
      <h2>{degree}</h2>
      <h2>{main}</h2>
      <h3>{description}</h3>
      <img src={url} alt=""></img>
    </div>
  );
}

export default App;

// Array Destructuring
// Complex state