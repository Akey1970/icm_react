import {React,useState,useEffect} from "react";
import {Card,CardBody, Row, Col,CardHeader,Form,FormGroup,Input,Label,Button,Table,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import base_url from "../api/bootapi";
import 'react-toastify/dist/ReactToastify.css';


const Congiguration_SetUp=()=>{
    
    const [year,setYear]=useState([]);
    const [month,setMonth]=useState([]);
    const navigate=useNavigate();
    const [policymodel,setPolicyModel]=useState([]);
   const form_submit=(e)=>{

            const formData = new FormData();
            let year=document.getElementById("year").value;
            let month=document.getElementById("month").value;
            let policy_model=document.getElementById("policy_model").value;

            formData.append("year", year);
            formData.append("month", month);
            formData.append("policy_model", policy_model);

            axios({
                method: "post",
                url: "http://localhost:8090/conf_form_data",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
            
            alert("success");
            console.log("running confsetup");

            document.getElementById("year").value = "";
            document.getElementById("month").value = "";
            document.getElementById("policy_model").value = "";
           // navigate("/confsetup");

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
        <Col md={3} style={{marginTop:0}}><Menus/></Col>
        <Col md={9} style={{marginLeft:-71,marginTop:10}}>
           <Form id="example-advanced-form">
            <Card style={{ width: '66rem',height:"100%",marginTop:70}}>
                <CardHeader style={{color:"#353c4e",marginTop:"10",height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>Configuration SetUp</h6></CardHeader>
                <CardBody>               
                    <Form>
                         <Row>
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
                                            <option value='January'>January</option>
                                            <option value='February'>February</option>
                                            <option value='March'>March</option>
                                            <option value='April'>April</option>
                                            <option value='May'>May</option>
                                            <option value='June'>June</option>
                                            <option value='July'>July</option>
                                            <option value='August'>August</option>
                                            <option value='September'>September</option>
                                            <option value='October'>October</option>
                                            <option value='November'>November</option>
                                            <option value='December'>December</option>
                                            

                                        </Input>
                                    </FormGroup>
                             </Col>
                             <Col md={6}>
                                    <FormGroup>
                                        <Label for="policy_model">Policy Model</Label>
                                        <Input id="policy_model" name="policy_model"  type="text"
                                           onChange={(e)=>{
                                            setPolicyModel({... policymodel,policy_model:e.target.value})
                                        }}/>
                                    </FormGroup>
                             </Col>
                          
                         </Row>                        
                            
                        
      
        <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:17,marginLeft:502,display:"none"}}>Loading...</Spinner>
        <Button className="bg-primary" type="button" onClick={form_submit}  style={{border:"none",marginLeft:472,width:92}}>Save</Button>
    </Form>
                
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
export default Congiguration_SetUp;