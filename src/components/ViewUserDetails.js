import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
const ViewUserDetails=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries= async ()=>{
    axios.get(`${base_url}/user_reg_master`).then(
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
  // <a href="/schemedetails?scheme_id=22">{row.scheme_id}</a>
  // <a href="/schemedetails?scheme_id={row.scheme_id}">{row.scheme_id}</a>
name:<b>ID</b>,
selector:(row) =>row.id,
sortable:true
},
{
name:<b>EMP_CODE</b>,
selector:(row) =>row.emp_code1,
sortable:true
},
{
name:<b>FIRST_NAME</b>,
selector:(row) =>row.first_name
},
{
name:<b>LAST_NAME</b>,
selector:(row) =>row.last_name
},
{
  name:<b>EMAIL_ID</b>,
  selector:(row) =>row.user_mail
  },
  {
    name:<b>IS_ACTIVATED</b>,
    selector:(row) =>row.is_activated
    },
    {
      name:<b>USER_TYPE</b>,
      selector:(row) =>row.user_type
      },
      {
        name:<b>ISICM</b>,
        selector:(row) =>row.is_icm
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

            <Col md={9} style={{marginLeft:-71,marginTop:80}}>
              <Card className="my-2" style={{width: '67rem', marginLeft:-7,height:"100%",marginTop:80}}>
                <CardHeader style={{backgroundColor: '#2677c145'}}>
                          <h6 style={{color:'#505458'}}>User Master</h6>
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
export default ViewUserDetails;