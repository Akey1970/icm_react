import {React,useEffect,useState} from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { FaArrowDown} from "react-icons/fa";
import {Card,CardText,CardBody,Button,CardHeader,Form,Row,Col,FormGroup,Label,Input,Table,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Scheme_Details=()=>{

  const [schemedetails,setSchemedetails]=useState([]);
  const [incentivedetails,setincentivedetails]=useState([]);
  const [documentdetails,setdocumentdetails]=useState([]);
  const navigate=useNavigate();


  const saveandaubmit=()=>{
    document.getElementById("spinner").style.display = 'block'; 
    const formData = new FormData();
    let scheme_id= document.getElementById('scheme_id').value;
    let created_by= document.getElementById('scheme_created_by').value;
     formData.append("scheme_id", scheme_id);
     formData.append("created_by", created_by);

     axios({
       method: "post",
       url: "http://localhost:8090/icmupdatescheme_request_react",
       data: formData,
       headers: { "Content-Type": "multipart/form-data" },
     })
       .then(function (response) {
        document.getElementById("spinner").style.display = 'none';
       alert(`Scheme id ${scheme_id} Successfully Submitted for Approval`)
        //toast.success(`Scheme Id ${scheme_id} has Sent for approval`);
        // const sleep = ms => new Promise(r => setTimeout(r, ms));
        // await  sleep(5000);
        navigate("/marketing");
       
       })
       .catch(function (response) {
       // toast('something went wrong');
      
       });
 
  }
  const approve=()=>{
    document.getElementById("spinner").style.display = 'block';
    const formData = new FormData();
   let scheme_id= document.getElementById('scheme_id').value;
   let created_by= document.getElementById('scheme_created_by').value;
    formData.append("scheme_id", scheme_id);
    formData.append("created_by", created_by);

    axios({
      method: "post",
      url: "http://localhost:8090/approve_scheme_icm",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        document.getElementById("spinner").style.display = 'none';
        alert(`Scheme id ${scheme_id} is Approved`)
        //toast.success(`Scheme Id ${scheme_id} has approved`);
        navigate("/marketing");
      })
      .catch(function (response) {
        toast('something went wrong');
      });

  }
  const reject=()=>{
        
    document.getElementById("spinner").style.display = 'block';
    var emp_id = localStorage.getItem("emp_menu");
    var emp_id_2=JSON.parse(emp_id);

    const formData = new FormData();
   let scheme_id= document.getElementById('scheme_id').value;
   //let created_by= document.getElementById('scheme_created_by').value;
   let created_by= "Prashant Kamble";
    formData.append("scheme_id", scheme_id);
    formData.append("created_by", created_by);
    formData.append("emp_id", emp_id_2);


    axios({
      method: "post",
      url: "http://localhost:8090/reject_scheme_react",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
       // toast.success(`Scheme Id ${scheme_id} has rejected`);
       document.getElementById("spinner").style.display = 'none';
       alert(`Scheme ${scheme_id} is Rejected`)
        navigate("/marketing");
      })
      .catch(function (response) {
        toast('something went wrong');
      });

    
  }
  const launch=()=>{
    document.getElementById("spinner").style.display = 'block';
    var emp_id = localStorage.getItem("emp_menu");
    var emp_id_2=JSON.parse(emp_id);

    const formData = new FormData();
   let scheme_id= document.getElementById('scheme_id').value;
   let created_by= document.getElementById('scheme_created_by').value;
    formData.append("scheme_id", scheme_id);
    formData.append("created_by", created_by);
    formData.append("emp_id", emp_id_2);

    axios({
      method: "post",
      url: "http://localhost:8090/publish_scheme_react",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
       
        //toast.success(`Scheme Id ${scheme_id} has launched successfully`);
        document.getElementById("spinner").style.display = 'none';
        alert(`Scheme ${scheme_id} is Launched`)
        navigate("/marketing");

      })
      .catch(function (response) {
        toast('something went wrong');
      });

  }

  useEffect(()=>
  {
    document.getElementById("spinner").style.display = 'block';
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get('scheme_id');


    var menu_string=localStorage.getItem("emp_menu");
    var user_id=JSON.parse(menu_string);
    console.log(typeof(user_id)+"  and value"+user_id);


    axios.get(`${base_url}/schemedetailsoficm_react?scheme_id=`+foo).then(
     
       (response)=>{   
          console.log("schm_det"+response.data);
          setSchemedetails(response.data);
          const date = new Date(schemedetails.start_date);
          if(schemedetails.active_flag!="Incomplete"){
           
            document.getElementById("save").style.display='none';
          }

          if(user_id === 'OMI-1045' && response.data.active_flag==='Incomplete'){
            //alert("if 1045: when scheme status incomplete "+user_id+" "+scheme_status);
            document.getElementById("approve").style.display='none';
            document.getElementById("reject").style.display='none';
            document.getElementById("launch").style.display='none';
            document.getElementById("save").style.display='block';   
          }
          else if(user_id === 'OMI-1045' && response.data.active_flag!="Incomplete"){
            //alert("else if 1045 when scheme status not equal incomplete: "+user_id+" "+scheme_status);
            document.getElementById("approve").style.display='none';
            document.getElementById("reject").style.display='none';
            document.getElementById("launch").style.display='none';
            document.getElementById("save").style.display='none';   
          }
        
           else if(user_id === 'OMI-1036'){
      
            console.log("inside Approval 1036 if");
            document.getElementById("approve").style.display='';
            document.getElementById("reject").style.display='';
            document.getElementById("save").style.display='none';
            document.getElementById("launch").style.display='none';
           
          }
          else if(user_id === 'OMI-0076'){
            console.log("in if 76");
            document.getElementById("approve").style.display='none';
            //document.getElementById("reject").style.display='';
            document.getElementById("launch").style.display='';
            document.getElementById("save").style.display='none';   
          }


          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          let ddate=date.getDate();
          
          var created_on=ddate+"-"+month+"-"+year;
          
          axios.get(`${base_url}/incentive_to_react?scheme_id=`+foo).then(
               
            (response)=>{   
              console.log(response.data);
              setincentivedetails(response.data);
              axios.get(`${base_url}/document_list_react?scheme_id=`+foo).then(
           
                (response)=>{   
                  console.log(response.data);
                  document.getElementById("spinner").style.display = 'none';
                setdocumentdetails(response.data);
                
                },
                (error)=>{
                    console.log(error);
                },[]);
            },
            (error)=>{
                console.log(error);
            },[]);
          
      
        
        },
        (error)=>{
          toast('something went wrong');
        },[]);

   

        let scheme_status= document.getElementById('active_flag').value;
    //alert("schemedetails.active_flag value"+schemedetails.active_flag);
    
},[]);

    return(
        <>
        <Header />
        <Row>
        <Col md={3} style={{height:"100%"}}>
        <Menus/>
        </Col>
        <Col md={9} style={{height:"100%"}}>
        <ToastContainer />
        <div style={{width: '67rem',height:"30px",marginLeft:-78,marginTop:20,backgroundColor:"rgb(228 228 228)"}}><b><span style={{padding:15,color:"#4a4a4a"}} >Scheme Details</span></b></div>
        <Form style={{marginLeft:-71,marginTop:17}}>
         <Card className="my-2" style={{width: '67rem', marginLeft:-7,height:"100%"}}>
                
         <Spinner color="primary" id="spinner" style={{marginTop:20,marginBottom:10,marginLeft:500,display:"none"}}>Loading...</Spinner>
                <CardBody>                
                  <CardText>
                    
                      <Row>
                          <Col md={4}>
                              <FormGroup>
                                <Label for="scheme_name">Scheme Name</Label>
                                <Input id="scheme_name" name="scheme_name" value={schemedetails.scheme_name} type="text" style={{backgroundColor:"#f1f1f3"}}/>
                              </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="scheme_id">Scheme ID</Label>
                                    <Input id="scheme_id" name="scheme_id" value={schemedetails.scheme_id} type="text"style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="active_flag">Scheme Status</Label>
                                    <Input id="active_flag" name="active_flag" value={schemedetails.active_flag} type="text" style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                        
                      </Row>

                      <Row>
                      <Col md={4}>
                                <FormGroup>
                                    <Label for="scheme_type">Scheme For</Label>
                                    <Input id="scheme_type" name="scheme_type" type="text" value="Sales People" style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                              <FormGroup>
                                <Label for="payout_cycle">Payout Cycle</Label>
                                <Input id="payout_cycle" name="payout_cycle" type="text" value={schemedetails.payout_cycle} style={{backgroundColor:"#f1f1f3"}}/>
                              </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="fin_yr">Fin Year</Label>
                                    <Input id="fin_yr" name="fin_yr" type="text" value={schemedetails.scheme_fin_yr} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                       
                      </Row>

                      
                      <Row>
                      <Col md={4}>
                                <FormGroup>
                                    <Label for="scheme_created_by">Scheme Created By</Label>
                                    <Input id="scheme_created_by" name="scheme_created_by" type="text" value={schemedetails.created_by} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="scheme_created_on">Scheme Created On</Label>
                                    <Input id="scheme_created_on" name="scheme_created_on" type="text" value={schemedetails.creation_date1} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                              <FormGroup>
                                <Label for="start_date">Effective Date From</Label>
                                <Input id="start_date" name="start_date" type="text" value={schemedetails.start_date1} style={{backgroundColor:"#f1f1f3"}}/>
                              </FormGroup>
                          </Col>
                          
                      </Row>
                      <Row>
                      <Col md={4}>
                                <FormGroup>
                                    <Label for="end_date">Effective Date To</Label>
                                    <Input id="end_date" name="end_date" type="text" value={schemedetails.end_date1} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="computation_cycle">Computation Cycle</Label>
                                    <Input id="computation_cycle" name="computation_cycle" type="text" value={schemedetails.computation_cycle} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="country">Country</Label>
                                    <Input id="country" name="country" type="text" value={schemedetails.country} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col md={4}>
                              <FormGroup>
                                <Label for="state">State</Label>
                                <Input id="state" name="state" type="text" value={schemedetails.state} style={{backgroundColor:"#f1f1f3"}}/>
                              </FormGroup>
                          </Col>
                          <Col md={4}>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <Input id="city" name="city" type="text" value={schemedetails.city} style={{backgroundColor:"#f1f1f3"}}/>
                                </FormGroup>
                          </Col>
                        
                      </Row>
                     
               
              </CardText>              
                    
          </CardBody>

          <Card className="my-2 mx-3" style={{width: '65rem'}}>
                <CardHeader  style={{backgroundColor: '#2677c145'}}>
                    <h6 style={{color:'#505458'}}>Scheme Incentive Details</h6>
                        
                </CardHeader>
                <CardBody>                
                  <CardText>
                     <Table bordered hover striped className="table">
                          <thead>
                              <tr>
                              <th >SR No</th>
                              <th>Scheme Id</th>
                              <th>Incentive To</th>
                              <th>Based On</th>
                              <th>Types of Account</th>
                              </tr>
                          </thead>
                          <tbody>
                          {
     incentivedetails.map((user,index)=>{
       
          return <tr key={index}>
             <td>{index+1}</td>
             <td>{user.scheme_id}</td>
             <td>{user.eligibility_to}</td>
             <td>{user.based_on}</td>
             <td>{user.type_of}</td>
             
          </tr>
     })
   }
                          </tbody>
</Table>
                  </CardText>              
                    
          </CardBody>
        </Card>
        <Card className="my-2 mx-3" style={{width: '65rem',}}>
                <CardHeader  style={{backgroundColor: '#2677c145'}}>
                    <h6 style={{color:'#505458'}}>Scheme Documents Details</h6>
                    
                </CardHeader>
                <CardBody>                
                  <CardText>
                  <Table bordered hover striped>
  <thead>
    <tr>
              <th>SR No</th>
							<th>Scheme ID</th>
							<th>Document Type</th>
							
							<th>Document Title</th>							
							<th>Upload Date</th>
							<th>Download File</th>
    </tr>
  </thead>
  <tbody>
   {
     documentdetails.map((user,index)=>{
       
          return <tr key={index}>
             <td>{index+1}</td>
             <td>{user.scheme_id}</td>
             <td>{user.doc_type}</td>
             <td>{user.doc_title}</td>
             <td>{user.doc_upload_date}</td>
             <td><a href={`http://localhost:8090/DowdicmDocument?scheme_id=${user.scheme_id}`}><FaArrowDown /></a></td>
             
          </tr>
     })
   }
  </tbody>
</Table>
                  </CardText>              
                  
                </CardBody>
                
        </Card>
        <div>
        <Button color="primary" style={{width:243,height:35,marginLeft:400,marginTop:20,marginBottom:10,display:"none"}} onClick={saveandaubmit} id="save">Save and Submit For Approval</Button>  
        <Button color="primary" style={{width:90,height:35,marginLeft:450,marginTop:20,marginBottom:10,display:"none"}} onClick={approve} id="approve">Approve</Button> 
        <Button color="primary" style={{width:90,height:35,marginLeft:8,marginTop:20,marginBottom:10,display:"none"}} onClick={reject} id="reject">Reject</Button>  
        <Button color="primary" style={{width:80,height:35,marginLeft:511,marginTop:20,marginBottom:10,display:"none"}} onClick={launch} id="launch">Launch Scheme</Button> 
        </div>

        </Card>

        </Form>
        </Col>
          
          </Row>
        </>
    )

}
export default Scheme_Details;