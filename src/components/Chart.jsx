import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Chart = ( props) => {
    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: props.title,
          },
        },
      };
      const la="g"
      const data = {
        labels: la,
        datasets: [{
          label: 'Rs',
          data: [props.rs],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        }]
      };
    
  return (
    <div style={{height:"156.4px",width:"280.6px",textAlign:"center"}}>
      <Bar options={options} data={data}/>
    </div>
  )
}
export default Chart
