import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import { Row, Col, CardHeader,Card,CardText,CardBody,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
const Icm_Scheme_Master=()=>{
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries= async (status)=>{
    axios.get(`${base_url}/schememastertest_react?status=`+status).then(
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
  
name:<b>SCHEME ID</b>,
selector:(row) =><a href={`/schemedetails?scheme_id=${row.scheme_id}`}>{row.scheme_id}</a>,
sortable:true
},
{
name:<b>SCHEME NAME</b>,
selector:(row) =>row.scheme_name
},
{
name:<b>SCHEME_FIN_YR</b>,
selector:(row) =>row.scheme_fin_yr
},
{
  name:<b>START_DATE</b>,
  selector:(row) =>row.start_date
},
{
  name:<b>END_DATE</b>,
  selector:(row) =>row.end_date
  },
  {
    name:<b>ACTIVE_FLAG</b>,
    selector:(row) =>row.active_flag
    },
    {
      name:<b>COMPUTATION_CYCLE</b>,
      selector:(row) =>row.computation_cycle
      },
      {
        name:<b>PAYOUT_CYCLE</b>,
        selector:(row) =>row.payout_cycle
        },
        {
          name:<b>CREATED_BY</b>,
          selector:(row) =>row.created_by
          },
          {
            name:<b>CREATION_DATE</b>,
            selector:(row) =>row.creation_date
            },
            {
              name:<b>COUNTRY</b>,
              selector:(row) =>row.country
              },
              {
                name:<b>STATE</b>,
                selector:(row) =>row.state
                },
                {
                  name:<b>CITY</b>,
                  selector:(row) =>row.city
                  },
{
 // name:"Action",
  //cell:row =><button className='btn btn-primary' onClick={()=>alert('Hii Shilpi '+row.alpha2Code)}>Edit</button>
}
];

useEffect(()=>{
  document.getElementById("spinner").style.display = 'block';
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get('active_flag');
getCountries(foo);
const result=countries.filter(country=>{
  return country.name.toLowerCase().match(search.toLowerCase());
})
setFilteredCountries(result);
},[search]);

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
                          <h6 style={{color:'#505458'}}>Scheme Master</h6>
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
export default Icm_Scheme_Master;


   

