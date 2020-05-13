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
        }
      });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default BarChart;
