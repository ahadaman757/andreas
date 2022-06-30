import React,{useState} from 'react'
import Chart from "react-apexcharts";
import VisitorsArray from '../../../../DummyDatabase/LiveVisitors'
function Visitors() {
   
    const [chartoptions, setchartOptions] = useState({
        colors:['#01906A'],
        zoom: {
            enabled: false
          },
        tooltip: {
            enabled:false,
            shared: false,
            intersect: false
          },
        chart: {
            height: 350,
            type: 'area'
          },
          stroke: {
            show: true,
            curve: 'smooth'
          },
        xaxis: {
            show: false,
            labels:{
                show:false
            }
            // categories:['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
        },
        yaxis:{
            show: false,
           
           labels:{
            formatter: (val) => { 
                return val +' k'
             },
           },
           axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 10,
            offsetX: 0,
            offsetY: 0
        },
      
        }
      },
      )
      const [chartSeries, setchartSeries] = useState([
        {
          name: "Live Visitors",
          data:VisitorsArray
        },
        
      ]
      )
  return (
    <Chart
          options={chartoptions}
          series={chartSeries}
          type="area"
          width="100%"
         
        />
  )
}
export default Visitors