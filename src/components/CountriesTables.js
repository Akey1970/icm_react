import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
const ConfDetails=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries= async ()=>{
    axios.get(`${base_url}/incentivemaster`).then(
      (response)=>{ 
        document.getElementById("spinner").style.display = 'none'; 
        setCountries(response.data);
        setFilteredCountries(response.data);
      },
      (error)=>{
          //alert(error);
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
        selector:(row) =>row.emp_code
    },
    {
        name:<b>EMP_TYPE</b>,
        selector:(row) =>row.emp_type
    },
    {
        name:<b>SALES_TYPE</b>,
        selector:(row) =>row.emp_sales_type
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
        selector:(row) =>row.emp_incentive_trgt
    },
    {
        name:<b>MONTH</b>,
        selector:(row) =>row.incentive_month
    },
    {
      name:<b>YEAR</b>,
      selector:(row) =>row.incentive_year
    },
    {
      name:<b>INCENTIVE_STATUS</b>,
      selector:(row) =>row.incentive_status
    },
    {
      name:<b>"INCENTIVE_AMOUNT</b>,
      selector:(row) =><b style={{color:'red'}}>{row.incentive_amount}</b>
  }
   ];


useEffect(()=>{
  document.getElementById("spinner").style.display = 'block';
  getCountries();
  setFilteredCountries(countries);
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
                          <h6 style={{color:'#505458'}}>Configuration Master</h6>
                </CardHeader>
                <CardBody style={{border:"2px solid transparent"}}>
                 
                <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:10,marginLeft:500,display:"block"}}>Loading...</Spinner>
                  <DataTable 
                
                columns={columns} 
                data={filteredCountries}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="400px"
                selectableRowsHighlight
                highlightOnHover
              
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
export default ConfDetails;