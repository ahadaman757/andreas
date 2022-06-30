import React, { useEffect, useState, useContext } from 'react'
import Chart from "react-apexcharts";
import constants from '../../../../constants'
import axios from 'axios'

import { AuthContext } from "../../../../App";


function PageViews(props) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [chartDATA, setchartDATA] = useState([])
  const [chartDate, setchartDate] = useState([])
  const [chartSeries, setchartSeries] = useState([
    {
      name: "Leads History",
      data: []
    },

  ]
  )
  useEffect(() => {
    console.log(props.company)
    axios.post(`https://${constants.host}:3003/chats/leadschart`, { c_name: authState.LoggedUserData.c_name, client_status: authState.LoggedUserData.account_type, id: authState.LoggedUserData.id }).then(res => {
      const data = res.data
      console.log(data)
      const leads = []
      for (let i = 0; i < data.length; i++) {


        leads.push({ x: data[i].Date, y: data[i].no_of_rows })

      }
      setchartSeries([
        {
          name: "Live Visitors",
          data: leads
        },

      ]
      )
      // for date
      const date = []
      for (let i = 0; i < data.length; i++) {

        date.push(data[i].no_of_rows)

      }
      setchartDate(date)


    })
  }, [])

  const [chartoptions, setchartOptions] = useState({
    plotOptions: {
      bar: {
        horizontal: false,
        s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: 'flat',
        e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: 'flat',
        borderRadius: 10,
        columnWidth: '30%',
        barHeight: '70%',
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        colors: {


          backgroundBarOpacity: .5,
          backgroundBarRadius: 0,
        },
        dataLabels: {
          position: 'top',
          maxItems: 100,
          hideOverflowingLabels: true,

        }

      }
    },
    colors: ['#007AFF'],
    zoom: {
      enabled: false
    },
    tooltip: {
      enabled: false,
      shared: false,
      intersect: false
    },
    chart: {
      height: 200,
      type: 'bar'
    },
    // stroke: {
    //   show: true,
    //   curve: ''
    // },
    xaxis: {
      show: false,
      labels: {
        show: true
      },
      categories: chartDate
    },
    yaxis: {
      show: true,

      labels: {
        formatter: (val) => {
          return val
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

  console.log(chartSeries.data)
  return (
    <Chart
      options={chartoptions}
      series={chartSeries}
      type="bar"
      width="100%"
      height={400}

    />
  )
}
export default PageViews