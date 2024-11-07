import React, { useState } from 'react';
import './App.css';

function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [units, setUnits] = useState('metric');

    const getBMICategory = (bmiValue) => {
        if (bmiValue < 18.5) {
            return 'Underweight: You may need to gain some weight for optimal health.';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            return 'Normal weight: Keep up the healthy lifestyle!';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            return 'Overweight: Consider making changes to achieve a healthier weight.';
        } else {
            return 'Obesity: Consult a healthcare provider for advice on weight management.';
        }
    };

    const calculateBMI = () => {
        let bmiValue;
        if (units === 'metric') {
            const heightInMeters = height / 100;
            bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        } else {
            const heightInInches = height * 0.0254;
            bmiValue = ((weight / (heightInInches * heightInInches)) * 703).toFixed(2);
        }
        setBmi(bmiValue);
        const bmiMessage = getBMICategory(bmiValue);
        setMessage(bmiMessage);
        setHistory([...history, { weight, height, bmi: bmiValue, message: bmiMessage, units }]);
    };

    const resetForm = () => {
        setWeight('');
        setHeight('');
        setBmi(null);
        setMessage('');
        setHistory([]);
    };

    return (
        <div className="bmi-calculator">

            <h1>BMI Calculator</h1>
            <button onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')} style={{ marginBottom: '1rem' }}>
                Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
            </button>

            <div>
                <label>Weight ({units === 'metric' ? 'kg' : 'lbs'}): </label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={`Enter your weight in ${units === 'metric' ? 'kg' : 'lbs'}`}
                />
            </div>

            <div>
                <label>Height ({units === 'metric' ? 'cm' : 'in'}): </label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={`Enter your height in ${units === 'metric' ? 'cm' : 'in'}`}
                />
            </div>
            
            <button onClick={calculateBMI}>Calculate</button>
            <button onClick={resetForm} style={{ marginTop: '1rem' }}>Reset</button>
            {bmi && (
                <div className="result">
                    <h2>Your BMI is: {bmi}</h2>
                    <p>{message}</p>
                </div>
            )}
            {history.length > 0 && (
                <div className="history">
                    <h3>BMI History</h3>
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>
                                Weight: {entry.weight} {entry.units === 'metric' ? 'kg' : 'lbs'}, 
                                Height: {entry.height} {entry.units === 'metric' ? 'cm' : 'in'} 
                                - BMI: {entry.bmi} ({entry.message})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BMICalculator;
