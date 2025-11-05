import React from 'react';
import './Chart.css';

const Chart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-container">
            <div 
              className="chart-bar"
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span className="chart-value">{item.value}</span>
            </div>
            <span className="chart-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;