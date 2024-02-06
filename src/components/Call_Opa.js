import {React,useState,useEffect} from "react";
import {Card,CardBody, Row, Col,CardHeader,Form,FormGroup,Input,Label,Button,Table,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';

const Call_Opa=()=>{
    const [year,setYear]=useState([]);
    const [month,setMonth]=useState([]);
    const [policymodel,setPolicyModel]=useState([]);
    const [search, setSearch]=useState("");
    const [filteredCountries, setFilteredCountries]=useState([]);
    const [countries, setCountries]=useState([]);


    function approve_incentive(e){
       // alert("scheme freezed approve_incentive");
        
        axios.get(`${base_url}/approve_incentive?id=`+e).then(
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
      } ,
     //   {
           
    //     name:<b>APPROVE</b>,                                                        
    //      cell:row =><button className='btn btn-primary' style={{width: 300}} onClick={() => approve_incentive(row.id)}>Approve</button>
       
    // },
    // {
        
    //     name:<b>REJECT</b>,                                                         
    //      cell:row =><button className='btn btn-primary' style={{width: 300}} onClick={() => reject_incentive(row.id)}>Reject</button>
      
    // }
       ];

      
   const form_submit=(e)=>{

            const formData = new FormData();
            let year=document.getElementById("year").value;
            let month=document.getElementById("month").value;
            formData.append("year", year);
            formData.append("month", month);
            document.getElementById("spinner").style.display = 'block';
            axios({
                method: "post",
                url: "http://localhost:8090/icm_json_rew_controller_3",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
                   
                    axios.get(`${base_url}/incentivemaster`).then(
                      (response)=>{
                        
                        document.getElementById("spinner").style.display = 'none';
                       // alert(' success in side incentivemaster')
                        console.log(response.data);
                        setCountries(response.data);
                        setFilteredCountries(response.data);
                      },
                      (error)=>{
                          alert(error);
                      //    alert(' error in side incentivemaster')
                      },[]);
                  
            })
            .catch(function (response) {
                alert("failed ")
                console.log(response);

            });

   }
  
  

    return(
<>
<div>
        <Header/>
        <Row>
        <Col md={3} style={{marginTop:-55}}><Menus/></Col>
        <Col md={9} style={{marginLeft:-71,marginTop:15}}>
           <Form id="example-advanced-form">
            <Card style={{ width: '66rem',height:"100%",marginTop:50}}>
                <CardHeader style={{color:"#353c4e",height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>Call OPA</h6></CardHeader>
                <CardBody >               
                    <Form>
                         <Row>

                         <Col md={2}>
                                  
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="year">Year</Label>
                                        <Input id="year" name="year" type="select"
                                             onChange={(e)=>{
                                                setYear(e.target.value)
                                            }}>
                                            <option>--Select--</option>
                                            <option value='2024'>2024</option>
                                            <option value='2023'>2023</option>
        
                                        </Input>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                    <Label for="month">Month</Label>
                                        <Input id="month" name="month" type="select"
                                             onChange={(e)=>{
                                                setMonth(e.target.value)
                                            }}>
                                            <option>--Select--</option>
                                            <option value='01'>Jan</option>
                                            <option value='02'>Feb</option>
                                            <option value='03'>Mar</option>
                                            <option value='04'>Apr</option>
                                            <option value='05'>May</option>
                                            <option value='06'>June</option>
                                            <option value='07'>July</option>
                                            <option value='08'>August</option>      
                                            <option value='09'>Sept</option>
                                            <option value='10'>Oct</option>
                                            <option value='11'>Nov</option>
                                            <option value='12'>Dec</option>
                                           
        
                                        </Input>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                   
                                    <Button className="bg-primary" type="button" onClick={form_submit}  style={{border:"none",marginTop:32,marginLeft:30,width:92}}>Run</Button>
                                    </FormGroup>
                             </Col>
                            
                             
                           
                          
                         </Row>                        
                            
                        
      
         <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:17,marginLeft:502,display:"none"}}>Loading...</Spinner> 
        
    </Form>
                
</CardBody>

<CardHeader style={{color:"#353c4e",marginTop:50,height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>Output OPA</h6></CardHeader>
                <CardBody>               
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
                />         
                
</CardBody>
</Card> 
</Form>
</Col>
<Form/>
</Row>       
</div>
</>
    );
};
export default Call_Opa;