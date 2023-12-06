import {React, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import {Input,Button,Row,Col,Label,FormGroup,Spinner} from 'reactstrap';
import { FaArrowDown} from "react-icons/fa";
import {CSVLink, CSVDownload} from 'react-csv';
import {ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CountriesTables=()=>{
  const navigate=useNavigate();
  const [search, setSearch]=useState("");
  const [countries, setCountries]=useState([]);
  const [table_data, setTable_data]=useState([]);
  const [filteredCountries, setFilteredCountries]=useState([]);
  const [scheme_id, setScheme_id] =  useState([]);
  const [amount, setAmount] =  useState([]);
  const [parentscheme, setParentscheme] =  useState([])
  const [schemename, setSchemename]=useState([]);
    const [isAdmini, setIsAdmini] = useState(false);
    var emp_code="";
  var status="Processed";

 
  const getCountries= async (status)=>{
   
    var emp_id=localStorage.getItem("emp_id");
    axios.get(`${base_url}/single_scheme_react_incentive?scheme_id=`+status+'&empid='+emp_id).then(
      (response)=>{ 
        setCountries(response.data);
        document.getElementById("spinner").style.display = 'none';
        setFilteredCountries(response.data);
      },
      (error)=>{
          console.log(error);
      },[]);
  };
  function showreport(){
    document.getElementById("spinner").style.display = 'block';
    var sch_id=document.getElementById("scheme_name").value;
    getCountries(sch_id);
    const result=filteredCountries.filter(country=>{
      return country.scheme_name.toLowerCase().match(search.toLowerCase());
    })
    setFilteredCountries(result);
}

  useEffect(()=>{
    document.getElementById("spinner").style.display = 'block';
   //alert("coutriestables useefffect");
    console.log("CountriesTables_Analysis");
    var emp_id=localStorage.getItem("emp_id");
    var emp_c=localStorage.getItem("emp_menu");
    emp_code=JSON.parse(emp_c);
    if(emp_code==='OMI-1045'){
        setIsAdmini(true);
       
    }
      axios.get(`${base_url}/loadicmschemename_incentive?emp_id=`+emp_id).then(   
      (response)=>{ 
       // alert("scheme name come ")
        console.log("scheme name come ")
        console.log(response.data);
        setSchemename(response.data);

        axios.get(`${base_url}/schememastertest_react_admin_incentive?emp_id=`+emp_id).then(
          (response)=>{ 
           
           console.log("the schememastertest_react_admin output");
            console.log(response.data); 
            document.getElementById("spinner").style.display = 'none';
            setCountries(response.data);
            setFilteredCountries(response.data);
          },
          (error)=>{
            
              console.log(error);
          },[]);

        
      },
      (error)=>{
          //alert("schemename "+error);
      },[]);
     // alert("the coutriestables empid"+emp_id);
        
    const result=filteredCountries.filter(country=>{
      return country.scheme_name.toLowerCase().match(search.toLowerCase());
    })
    setFilteredCountries(result);

 
},[search]);


  const columns=[
    {
        name:<b>SCHEME ID</b>,
        selector:(row) =><a id="sch_id" href={`/schemedetails?scheme_id=${row.scheme_id}`}>{row.scheme_id}</a>,
        sortable:true,
        
    },
    {
        name:<b>SCHEME NAME</b>,
        selector:(row) =>row.scheme_name
    },
    {
        name:<b>EMP ID</b>,
        selector:(row) =>row.empid
    },
    {
        name:<b>FULLNAME</b>,
        selector:(row) =>row.fullname
    },
    {
        name:<b>EMAIL</b>,
        selector:(row) =>row.email
    },
    {
        name:<b>SALES TYPE</b>,
        selector:(row) =>row.sales_type
    },
    {
        name:<b>BASED ON</b>,
        selector:(row) =>row.based_on
    },
    {
        name:<b>TYPE OF</b>,
        selector:(row) =>row.type_of
    },
    {
      name:<b>CTC</b>,
      selector:(row) =>row.ctc
    },
    {
      name:<b>TOTAL REVENUE</b>,
      selector:(row) =>row.total_sell
    },
    {
      name:<b>STATUS</b>,
      selector:(row) =><b style={{color:'red'}}>{row.status}</b>
  },
    {
        name:<b>DEFICIT AMOUNT</b>,
        selector:(row) =>row.pending_amt
    },
    {
        name:<b>INCENTIVE AMOUNT</b>,
        selector:(row) =>row.incentive_amt
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
      name:<b>ADJUSTEMENT AMOUNT</b>,
      selector:(row) =>row.amount
    },
    {
      name:<b>PAYOUT AMOUNT</b>,
      selector:(row) =>row.amount+row.incentive_amt
    },
   ];

    function row_selected(e){
      setTable_data(e.selectedRows);
     

    }
  
  
    function handleChange(){
    
      table_data.map((arr) => {
        setScheme_id(arr.scheme_id);
        var a=document.getElementById("incentive_amt"+arr.scheme_id).value;
        console.log("the a value _"+a);
        setAmount(a);
      
        axios.post(`${base_url}/savepoint_amt_val?scheme_id=`+arr.scheme_id+`&amt=`+a+`&emp_id=`+arr.empid+`&emp_id2=40`).then(
          (response)=>{
            alert("data saved successfully");
            toast.success("data saved successfully");
          },
          (error)=>{
              console.log(error);         
          }
       )
      });
    }
  
   // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredCountries)} />, []);
  return(
    <>

                             <Row style={{marginTop:30}}>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="scheme_name">Scheme Name :<span style={{color:'red'}}><b>*</b></span></Label>                               
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>                                              
                                                <Input id="scheme_name" name="scheme_name" type="select">
                                                    {
                                                        schemename.map((year) => (
                                                            <option key={year} value={year.scheme_id}>{year.scheme_name}</option>
                                                        ))
                                                    }
                                                </Input>

                                        </Col>
                                        <Col md={3}>
                                            <Button className='btn btn-sm' style={{width:120,height:35,backgroundColor:"rgb(2, 123, 198)",border:"none"}} onClick={showreport}>Show Report</Button>  
                                        </Col>
                                        <Col md={3}>
                                        {/* <Button className='btn btn-sm ' style={{width:150,height:35,backgroundColor:"rgb(2, 123, 198)",border:"none",marginLeft:-111}} onClick={processscheme}>Freeze</Button> */}
                                        <Button className='btn btn-sm ' style={{width:150,height:35,backgroundColor:"rgb(2, 123, 198)",border:"none",marginLeft:-111}}><CSVLink data={filteredCountries}  style={{"text-decoration": "none",color:"white",width:140,height:35}}>Download Report</CSVLink></Button>
                           
                                        <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:10,marginLeft:-300,display:"none"}}>Loading...</Spinner>
                                        </Col>
                                      
                                            </Row> 


 <DataTable
     
     columns={columns} 
     data={filteredCountries}
     pagination
     fixedHeader
     fixedHeaderScrollHeight="400px"
     highlightOnHover
     onSelectedRowsChange={row_selected}
     //actions={actionsMemo}
     subHeader
     subHeaderComponent={<input type='text' placeholder='Search here' className='w-25 form-control' value={search} onChange={(e)=>setSearch(e.target.value)}/>}
     // subHeaderAlign='Left'
     />
     <div>
     {/* <Button className='btn btn-sm' style={{width:80,height:35,marginLeft:455,marginTop:20,marginBottom:10,backgroundColor:"rgb(2, 123, 198)",border:"none"}} onClick={handleChange}>Save</Button>  */}
     
     </div>
  
    </>
       
       
    
    
   )
};
export default CountriesTables;