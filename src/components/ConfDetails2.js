import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
const ConfDetails2=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries= async ()=>{
    axios.get(`${base_url}/confdetails`).then(
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
sortable:true
},
{
name:<b>YEAR</b>,
selector:(row) =>row.year,
sortable:true
},
{
name:<b>MONTH</b>,
selector:(row) =>row.month
},
{
name:<b>POLICY_MODEL</b>,
selector:(row) =>row.policy_model
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
export default ConfDetails2;