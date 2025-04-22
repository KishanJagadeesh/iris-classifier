import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputs, setInputs] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: ''
  });
  // ss
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', inputs);
      setResult(res.data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Iris Classifier</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        {['sepal_length', 'sepal_width', 'petal_length', 'petal_width'].map((field) => (
          <div key={field} style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem', textTransform: 'capitalize' }}>
              {field.replace('_', ' ')}:
            </label>
            <input
              type='number'
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              step='0.1'
              required
            />
          </div>
        ))}
        <button type='submit'>Predict</button>
      </form>
      {result !== null && <h2>Predicted Class: {result}</h2>}
    </div>
  );
}

export default App;
