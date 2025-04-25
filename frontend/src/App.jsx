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
      setResult(res.data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Iris Classifier</h1>
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
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f4f8fb',
    minHeight: '100vh',
  },
  title: {
    color: '#333',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    width: '300px',
    transition: 'all 0.3s ease',
  },
  inputGroup: {
    marginBottom: '1rem',
    width: '100%',
  },
  label: {
    marginBottom: '0.3rem',
    fontSize: '1rem',
    color: '#555',
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '2px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '2px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#4caf50',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  result: {
    marginTop: '1rem',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default App;
