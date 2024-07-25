import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [Weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '93bbbe30352b8a0e1fe9d47a3a560e54';

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeather(response.data);
      setError(null);  // Clear any previous error
    } catch (error) {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Weather Application</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Get Weather</button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          {Weather && (
            <div>
              <h2>{Weather.name}</h2>
              <p>{Weather.weather[0].description}</p>
              <p>{(Weather.main.temp - 273.15).toFixed(2)} °C</p>
              <img src={`https:/openweathermap.org/img/wn/${Weather.weather[0].icon}.png`} alt="Weather icon" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg)',  // Use the URL of the image
    fontFamily: 'Arial',
  },
  card: {
    marginLeft:'15px',
    backgroundColor: 'transparent',
    border: '2px solid #455B71',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '290px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '16px',  // Increased border radius
    border: 'none',
    width: '45%',  // Smaller width
    boxSizing: 'border-box',
    marginTop:`25px`,
  },
  error: {
    color: 'red',
  },
};

export default App;
