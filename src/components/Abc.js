import {React,useState,useEffect} from "react";
import {Card,CardBody, Row, Col,CardHeader,Form,FormGroup,Input,Label,Button,Table,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import 'react-toastify/dist/ReactToastify.css';


const UserSetup=()=>{
    const [empcode, setEmpCode]=useState([]);
    const [empdata,setEmpData]=useState([]);
    const [empdata2,setEmpData2]=useState([]);
    const [state, setState] = useState(true);
    const [tdar,setTdar]=useState([]);


    const [emp_code1, setEmp_code1] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email_id, setEmail_id] = useState('');
    const [hcmstatus, setHCMStatus] = useState('');
    const [user_type, setUser_type] = useState('');
    const [icmstatus, setICMStatus] = useState('');
    

    
    const fetchData=()=>{

        axios.get(`https://demo.omfysgroup.com/mindsconnectleapi/geticmemployeecode`).then(   
            (response)=>{ 
              //alert("scheme name come ")
              console.log("empcodes name come ")
              console.log(response.data);
              setEmpCode(response.data);
              
            },
            (error)=>{
                //alert("schemename "+error);
                console.log("API Error empcode")
                console.log(error);
            },[]);

    }


   const empdetails=(y)=>{

    let emp_code=y.target.value;
axios.get(`https://demo.omfysgroup.com/mindsconnectleapi/geticmemployeebasedonempcode?empcode=`+emp_code).then(   
    (response)=>{ 
      console.log("empcodes Details ")
      console.log(response.data[0]);
      setEmpData(response.data[0]);
      setEmpData2(response.data); 
    },
    (error)=>{
        console.log("API Error empcodes Details")
        console.log(error);
    },[]);

   };

   const form_submit=(e)=>{

    const formData = new FormData();
    console.log("form submitting with data")
    let emp_code_d=document.getElementById("emp_code").value;
    let first_name=document.getElementById("first_name").value;
    let last_name=document.getElementById("last_name").value;
    let email_id=document.getElementById("email_id").value;
    let hcmstatus=document.getElementById("hcm").value;
    let icmstatus=document.getElementById("icmstatus").value;
    let user_type=document.getElementById("user_type").value;
    
console.log(emp_code_d+' '+first_name+' '+' '+first_name)

formData.append("emp_code", emp_code_d);
formData.append("first_name", first_name);
formData.append("last_name", last_name);
formData.append("email_id", email_id);
formData.append("hcmstatus", hcmstatus);
formData.append("icmstatus", icmstatus);
formData.append("user_type", user_type);

     setTdar(prevArr => [...prevArr,{emp_code_d:"emp_code",first_name:"first_name",last_name:"last_name",email_id:"email_id",hcmstatus:"hcmstatus",icmstatus:"icmstatus",user_type:"user_type"}]);
     console.log("formData value below");
     console.log(formData);


axios({
    method: "post",
    url: "http://localhost:8090/user_form_data",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
    
    alert("success");
        //    document.getElementById("spinner").style.display = 'none';
    //     toast.success("scheme saved successfully");
        
       // navigate("/schemedetails?scheme_id="+response.data);
    })
    .catch(function (response) {
        alert("fail")
        console.log(response);
    });

   }


    useEffect(() => {
        fetchData();
      }, []);
    return(
<>
<div>
        <Header/>
        <Row>
        <Col md={3} style={{marginTop:-55}}><Menus/></Col>
        <Col md={9} style={{marginLeft:-71,marginTop:15}}>
           <Form id="example-advanced-form">
            <Card style={{ width: '66rem',height:"100%",marginTop:30}}>
                <CardHeader style={{color:"#353c4e",marginTop:"10",height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>User SetUp</h6></CardHeader>
                <CardBody>               
                    <Form>
                         <Row>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="emp_code">Emp_Code</Label>
                        
                                        <Input id="emp_code" name="emp_code" type="select"
                                        onChange={(e)=>{empdetails(e)}}>
                                            <option>--Select--</option>
                                            {empcode.map((e, key) => {
                                         return <option key={key} value={e.Employee_Code}>{e.Employee_Code}</option>;
                                                 })}
        
                                        </Input>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="first_name">First_Name</Label>
                                        <Input id="first_name" name="first_name" type="text"
                                      
                                       value={empdata.first_name}
                                           onChange={(e)=>{
                                            setFirstName(e.target.value)
                                        }}/>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="middle_name">Middle_Name</Label>
                                        <Input id="middle_name" name="middle_name"  type="text"
                                           onChange={(e)=>{
                                            setEmpData({... empdata,middle_name:e.target.value})
                                        }}/>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="last_name"> Last_Name</Label>
                                        <Input id="last_name" name="last_name"  type="text"
                                          value={empdata.last_name}
                                         onChange={(e)=>{
                                            setLast_name(e.target.value)
                                        }}/>
                                    </FormGroup>
                             </Col>
                         </Row>                        
                        
                         <Row>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="email_id">Email_Id</Label>
                                        <Input id="email_id" name="email_id"  type="email"
                                        value={empdata.user_mail}
                                          onChange={(e)=>{
                                            setEmail_id(e.target.value)
                                        }}/>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="hcmstatus">HCM Status</Label>   
                                             <Input id="hcmstatus" name="hcmstatus status" type="select">
                                                <option  >--Select--</option>
                                                <option selected value='Y'>Active</option>
                                                <option value='N'>Deactive</option>
                                                onChange={(e)=>{
                                                    setHCMStatus(e.target.value)
                                                }}
                                             </Input>                                       
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="user_type"> User_Type</Label>
                                        {/* <Input id="user_type" name="user_type"  type="text"
                                       /> */}
                                        <Input id="user_type" name="user_type" type="select">
                                            <option>--Select--</option>
                                            

                                             <option value="Admin">Admin</option>
											<option value="Sales Manager">Sales Manager</option> 


                                            {empdata2.map((e, key) => {
                                         return <option selected key={key} value={e.user_type}>{e.user_type}</option>;
                                                 })}
											
                                            onChange={(e)=>{
                                            setUser_type(e.target.value)
                                        }}
                                        </Input>
                                    </FormGroup>
                             </Col>

                             <Col md={3}>
                                    <FormGroup >
                                        <Label for="icmstatus">ICM Status</Label>
                                    

                                        <FormGroup switch style={{ width: "78",height:"33"}}>
                                                <Input

                                                    type="switch"
                                                    checked={state}
                                                    id="icmstatus" 
                                                    name="icmstatus"
                                                    style={{ width: "78",height:"33"}}
                                                    // onClick={() => {
                                                    //     setICMStates(!state);
                                                    // }}
                                                    onChange={(e)=>{
                                                        setICMStatus(!state)
                                                    }}
                                                />
        
                                        </FormGroup>
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
export default UserSetup;