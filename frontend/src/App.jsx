import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputs, setInputs] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://iris-classifier-0ku9.onrender.com/predict', inputs);
      const speciesMap = ['Setosa', 'Versicolor', 'Virginica'];
      setResult(speciesMap[res.data.prediction]);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  return (
    <div style={styles.page } >
      <div style={styles.container}>
        <h1 style={styles.title}>🌸 Iris Classifier -Flower seggregation</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {['sepal_length', 'sepal_width', 'petal_length', 'petal_width'].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <label style={styles.label}>
                {field.replace('_', ' ')}:
              </label>
              <input
                type="number"
                name={field}
                value={inputs[field]}
                onChange={handleChange}
                step="0.1"
                required
                style={styles.input}
              />
            </div>
          ))}
          <button type="submit" style={styles.button}>Predict</button>
        </form>
        {result !== null && <h2 style={styles.result}>Predicted Class: {result}</h2>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:'100vw',
    padding: 0,
    // background: 'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)'s,
    background: 'linear-gradient(135deg,rgb(69, 144, 218) 0%,rgb(145, 51, 51) 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2.5rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.2rem',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1.2rem',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.95rem',
    color: '#34495e',
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    padding: '0.7rem 0.9rem',
    fontSize: '1rem',
    border: '1.5px solid #ccc',
    borderRadius: '6px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '0.9rem',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
  result: {
    marginTop: '2rem',
    color: '#2c3e50',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
};

export default App;
