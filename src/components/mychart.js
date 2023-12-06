
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import base_url from "../api/bootapi";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const  data=[
            // ['Year','Sales','Expences','profit'],
            // ['2019',1000,400,200],
            // ['2018',1100,600,250],
            // ['2016',900,300,300],
            // ['2015',1200,1000,200],
            // ['2015',800,100,400]
            ];
const options={
    chart: {
        title:'Company Performance',
        subtitle:'Sales, Incentive, and Profit: 2016-2020'
    }
  
}


const My_Chart = () => {

  const [socialname,setsocialname]=useState([]);
  const [socialvalue,setsocialvalue]=useState([]);
  const [chartval, setChartval] =  useState([]);
  useEffect(()=>{
    
    console.log('running mychart');
    axios.get(`${base_url}/mychartval`).then(
        (response)=>{ 
          
            // ['Year','Sales','Expences','profit'],
            // ['2019',1000,400,200],
            // ['2018',1100,600,250],
            // ['2016',900,300,300],
            // ['2015',1200,1000,200],
            // ['2015',800,100,400]



              const socialmedianame=[];
              socialmedianame.push("Report");
              socialmedianame.push("total_revenue");
              socialmedianame.push("total_incentive");
              socialmedianame.push("total_adjustment");  
              data.push(socialmedianame);
              const socialmediavalue=[];
              socialmediavalue.push('Incentive Details');
              // socialmediavalue.push(response.data.totel_sell);
              // socialmediavalue.push(response.data.total_incentive);
              // socialmediavalue.push(response.data.adjust_amt);

              socialmediavalue.push(80000);
              socialmediavalue.push(60000);
              socialmediavalue.push(20000);
              //socialmediavalue.push(3000000);

              
              

              // const socialmediavalue2=[];
              // socialmediavalue2.push('Profit');
              // socialmediavalue2.push(response.data.totel_sell);
              // socialmediavalue2.push(response.data.total_incentive);
              // socialmediavalue2.push(3000000);
              // data.push(socialmediavalue2);

              // const socialmediavalue3=[];
              // socialmediavalue3.push('Revenue');
              // socialmediavalue3.push(response.data.totel_sell);
              // socialmediavalue3.push(response.data.total_incentive);
              // socialmediavalue3.push(3000000);
              // data.push(socialmediavalue3);
             
             data.push(socialmediavalue);
              setChartval(response.data);          
        },
        (error)=>{
            console.log(error);
        },[]);
  },[])
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

export default My_Chart;