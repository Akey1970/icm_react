import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";




const ApprovedListIncen=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries= async ()=>{
    axios.get(`${base_url}/approvedincenlist`).then(
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
selector:(row) =>  
  <a href={`http://localhost:8090/pdf_download?id=${row.id}`}>{row.id}</a>

  ,
sortable:true
},
{
  name:<b>Empt Id</b>,
  selector:(row) =>row.emp_id
  },
{
  name:<b>Type</b>,
  selector:(row) =>row.emp_type
  },
  {
    name:<b>Sales Type</b>,
    selector:(row) =>row.sales_type
    },
    {
      name:<b>Emp_ctc</b>,
      selector:(row) =>row.emp_ctc
      },
      {
        name:<b>Po number</b>,
        selector:(row) =>row.po_number
        },
        {
          name:<b>Emp Target</b>,
          selector:(row) =>row.emp_target
          },
          {
            name:<b>Emp Target</b>,
            selector:(row) =>row.emp_target
            },
            {
              name:<b>Incentive Status</b>,
              selector:(row) =>row.incentive_status,
              sortable:true
              },

{
name:<b>Year</b>,
selector:(row) =>row.year,
sortable:true
},
{
name:<b>Month</b>,
selector:(row) =>row.month
},

// {
// name:<b>POLICY_MODEL</b>,
// selector:(row) =>row.policy_model
// },
{
  name:<b>Approval Status</b>,
  selector:(row) =>row.approval_status
},
{
  name:<b>Incentive_amount</b>,
  selector:(row) =>row.Incentive_amount
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
                          <h6 style={{color:'#505458'}}>Approved Incentive List</h6>
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
export default ApprovedListIncen;