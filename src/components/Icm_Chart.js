import React from "react";
import { Chart } from "react-google-charts";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const  data=[
            ['Year','Sales','Expences','profit'],
            ['2019',1000,400,200],
            ['2018',1100,600,250],
            ['2016',900,300,300],
            ['2015',1200,1000,200],
            ['2015',800,100,400]
            ];
const options={
    chart: {
        title:'Company Performance',
        subtitle:'Sales, Expences, and Profit: 2016-2020'
    }
}


const ICM_Chart = () => {
        return (
          <>
         
          <Chart
                chartType="Bar"
                data={data}
                options={options}
                width="85%"
                height="400px"
                legendToggle
          />
          </>
        );
}

export default Icm_Chart;

