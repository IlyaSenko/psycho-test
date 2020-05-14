import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'bar',
        data: {
          labels: nextProps.labels,
          datasets: [{
            barPercentage: 0.4,
            label: 'Результати тесту',
            data: nextProps.data,
            backgroundColor: nextProps.colors
          }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        max:100, // Set it to your Max value
                        min: 0,
                        beginAtZero: true
                    }
                }]
            }
        }
      });
  }

  render() {
    return (
      <div style={{position:'relative', margin: 'auto', width:"80vw"}}>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default BarChart;
