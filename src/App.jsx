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
    backgroundImage: 'url(https://t4.ftcdn.net/jpg/02/99/79/41/240_F_299794170_3Md156JNSuBt7oHBaRApj1lvm5IjS6CL.jpghttps://t3.ftcdn.net/jpg/02/70/92/68/240_F_270926864_i2D8igkbTP5EF2Fl9tU8Kcopa8EcZvC7.jpghttps://t3.ftcdn.net/jpg/00/75/76/58/240_F_75765874_o4Z1ncSW94KkplLKrwLYIFAV9V4HqD5U.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
    backgroundColor: 'lightgreen',
    borderRadius: '15px',  // Increased border radius
    border: 'none',
    width: '50%',  // Smaller width
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
  },
};

export default App;
