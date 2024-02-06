import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
const Incentivereport=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const [filteredCountries_2, setFilteredCountries_2]=useState([]);
  const [table_data, setTable_data]=useState([]);
  let resp_data=[];
  const getCountries= async ()=>{
    axios.get(`${base_url}/incentivemaster`).then(
      (response)=>{ 
        document.getElementById("spinner").style.display = 'none'; 
       // setCountries(response.data);
        setFilteredCountries(response.data);
        setFilteredCountries_2(response.data);
        resp_data=response.data;
        console.log("incentivemaster response")
        console.log(response.data)
      },
      (error)=>{
          //alert(error);
      },[]);
  };

  function approve_incentive(e){
    alert("scheme freezed approve_incentive"+e);
    //console.log(e)
    
    axios.get(`${base_url}/approve_incentive?id=`+e).then(
      (response)=>{ 
        console.log("filteredCountries")
        console.log(filteredCountries)
        let ff=filteredCountries;

        const arr = ff.filter((item) => item.id !== e);
        console.log("arr value")
        console.log(arr)

        setFilteredCountries(arr);
        
      },
      (error)=>{
          console.log(error);
      },[]);
    };
    function reject_incentive(e){
       // alert("scheme freezed reject_incentive");
        
        axios.get(`${base_url}/reject_incentive?id=`+e).then(
          (response)=>{ 


            let ff=filteredCountries;

            const arr = ff.filter((item) => item.id !== e);
            console.log("arr value")
            console.log(arr)
    
            setFilteredCountries(arr);
            
          },
          (error)=>{
              console.log(error);
          },[]);
        };
  const columns=[
    {
        name:<b>ID</b>,
        selector:(row) =>row.id,
        sortable:true,
        
    },

    {
        name:<b>EMP_ID</b>,
        selector:(row) =>row.emp_id
    },
    {
        name:<b>EMP_TYPE</b>,
        selector:(row) =>row.emp_type
    },
    {
        name:<b>SALES_TYPE</b>,
        selector:(row) =>row.sales_type
    },
    {
        name:<b>EMP_CTC</b>,
        selector:(row) =>row.emp_ctc
    },
    {
        name:<b>PO_NUMBER</b>,
        selector:(row) =>row.po_number
    },
    {
        name:<b>EMP_TARGET</b>,
        selector:(row) =>row.emp_target
    },
    {
        name:<b>MONTH</b>,
        selector:(row) =>row.month
    },
    {
      name:<b>YEAR</b>,
      selector:(row) =>row.year
    },
    {
      name:<b><center>INCENTIVE_STATUS</center></b>,
      selector:(row) =><center>{row.incentive_status}</center>
    },
    {
      name:<b>INCENTIVE_AMOUNT</b>,
      selector:(row) =><b style={{color:'red'}}>{row.Incentive_amount}</b>
  } ,   {
       
    name:<b>APPROVE</b>,
     cell:row =><button type="button" className='btn btn-primary' style={{width: 300}} onClick={() => approve_incentive(row.id)}>Approve</button>
   
},
{
    
    name:<b>REJECT</b>,
     cell:row =><button type="button" className='btn btn-primary' style={{width: 300}} onClick={() => reject_incentive(row.id)}>Reject</button>
  
}
   ];
   function row_selected(e){
    console.log(e.selectedRows);
    setTable_data(e.selectedRows);
   

  }
useEffect(()=>{
  document.getElementById("spinner").style.display = 'block';
  getCountries();
  //setFilteredCountries(countries);
},[]);

  return(
    <div>
     <Header />
     <Row>
            <Col md={3}>
              <Menus/>
            </Col>

            <Col md={9} style={{marginLeft:-71,marginTop:60}}>
              <Card className="my-2" style={{width: '67rem', marginLeft:-7,height:"100%",marginTop:80}}>
                <CardHeader style={{backgroundColor: '#2677c145'}}>
                          <h6 style={{color:'#505458'}}>Incentive Master</h6>
                </CardHeader>
                <CardBody style={{border:"2px solid transparent"}}>
                 
                <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:10,marginLeft:500,display:"block"}}>Loading...</Spinner>
                <DataTable
     
     columns={columns} 
     data={filteredCountries}
     pagination
     fixedHeader
     fixedHeaderScrollHeight="400px"
     selectableRows
     selectableRowsHighlight
     highlightOnHover
     onSelectedRowsChange={row_selected}
     subHeader
     subHeaderComponent={<input type='text' placeholder='Search here' className='w-25 form-control' value={search} onChange={(e)=>setSearch(e.target.value)}/>}
     // subHeaderAlign='Left'
     />
                  
                </CardBody>
              </Card>
                  
            </Col>
        </Row>
    </div>
    
   )
};
export default Incentivereport;