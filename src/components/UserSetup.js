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
    const [profile_id,setProfile_id]=useState([]);


    const [emp_code1, setEmp_code1] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email_id, setEmail_id] = useState('');
    const [status, setStatus] = useState('');
    const [icm_user, setIcm_user] = useState('');
    const [user_type, setUser_type] = useState('');
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
      setEmpData(response.data[0]);
      setEmpData2(response.data);
    },
    (error)=>{
        console.log(error);
    },[]);

   };

   const form_submit=(e)=>{

    const formData = new FormData();

console.log("form submitting with data")
console.log("first_name")
//console.log(first_name)



let emp_code_d=document.getElementById("emp_code").value;
let first_name=document.getElementById("first_name").value;
let password=document.getElementById("password").value;
let last_name=document.getElementById("last_name").value;
let email_id=document.getElementById("email_id").value;
let status=document.getElementById("status").value;
let user_type=document.getElementById("user_type").value;
let icm_user=document.getElementById("icm_user").value;

formData.append("emp_code1", emp_code_d);
formData.append("first_name", first_name);
formData.append("password", password);
formData.append("last_name", last_name);
formData.append("user_mail", email_id);
formData.append("is_activated", status);
formData.append("user_type", user_type);
formData.append("is_icm", icm_user);

if(user_type==='admin'){
   
    formData.append("profile_id", 1);
}
else if(user_type==='sales_manager'){
    formData.append("profile_id", 2);
}
console.log(formData);


axios({
    
    method: "post",
    url: "http://localhost:8090/user_form_data",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
   //     alert(response.profile_id);
    alert("success");


    
    let emp_code_d=document.getElementById("emp_code").value="";
let first_name=document.getElementById("first_name").value="";
let password=document.getElementById("password").value="";
let last_name=document.getElementById("last_name").value="";
let email_id=document.getElementById("email_id").value="";
let status=document.getElementById("status").value="";
let user_type=document.getElementById("user_type").value="";
let icm_user=document.getElementById("icm_user").value="";

        //    document.getElementById("spinner").style.display = 'none';
    //     toast.success("scheme saved successfully");
        
       // navigate("/schemedetails?scheme_id="+response.data);
    })
    .catch(function (response) {
        alert("failed ")
        console.log(response);
    });

   }


    useEffect(() => {
        fetchData();
      }, []);

    const handleFormsubmit=(e)=>{
     
        postDataToServer();
          e.preventDefault();
      };
    
      const postDataToServer=()=>{
 
        document.getElementById("spinner").style.display = 'block';
        if(empdata.emp_code === undefined && empdata.password === undefined){
          alert('Plese Enter Your Credentials');
        }
        else if(empdata.emp_code === ""|| empdata.emp_code===undefined){  
          alert('Plese Enter UserName'); 
       }else if(empdata.password === ""|| empdata.password===undefined){
         alert('Plese Enter Password');
       }
        else{
    
          axios.post(`${base_url}/berger_login6`,empdata).then(
            (response)=>{
             console.log(response.data);
             if(response.data.status==="Y"){
                alert('data saved successfully');
             }else{
               alert('somehing went wrong');
             }
            },
            (error)=>{
                alert('user registration Failed!!');
                         
            }
         )
        }
    
    }
    return(
<>
<h1>
    It is returning Abc Html page
</h1>


<div>
        <Header/>
        <Row>
        <Col md={3} style={{marginTop:-55}}><Menus/></Col>
        <Col md={9} style={{marginLeft:-71,marginTop:10}}>
           <Form id="example-advanced-form"  onSubmit={handleFormsubmit}>
            <Card style={{ width: '66rem',height:"100%",marginTop:30}}>
                <CardHeader style={{color:"#353c4e",marginTop:"10",height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>User SetUp</h6></CardHeader>
                <CardBody>               
                    <Form>
                         <Row>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="emp_code">Username</Label>
                                       
                                   
                                        <Input id="emp_code" name="emp_code" type="select"
                                        onChange={(e)=>{empdetails(e)}}>
                                            <option value="">--Select--</option>
                                            {empcode.map((e, key) => {
                                         return <option key={key} value={e.Employee_Code}>{e.Employee_Code}</option>;
                                                 })}
        
                                        </Input>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input id="password" name="password"  type="text"
                                           onChange={(e)=>{
                                            setEmpData({... empdata,password:e.target.value})
                                        }}/>
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
                                        <Label for="status">Hcm_User_Status</Label>
                                  
                                        {  empdata.is_activated=='Y'?
                                             <Input id="status" name="status" type="select">
                                             <option value="" >--Select--</option>
                                             <option selected value='Y'>Active</option>
                                             <option value='N'>Deactive</option>
                                             onChange={(e)=>{
                                            setStatus(e.target.value)
                                        }}
                                             </Input>
                                          

                                            :

                                            <Input id="status" name="status" type="select">
                                             <option value="" >--Select--</option>
                                             <option  value='Y'>Active</option>
                                             <option selected value='N'>Deactive</option>
                                             onChange={(e)=>{
                                            setStatus(e.target.value)
                                        }}
                                             </Input>

                                            

                                        }
                                          
                                    </FormGroup>
                             </Col>

                             

                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="icm_user">Icm_User_Status</Label>
                                  
                                        {  empdata.is_icm=='Y'?
                                             <Input id="icm_user" name="icm_user" type="select">
                                             <option value="" >--Select--</option>
                                             <option  value='Y'>Active</option>
                                             <option value='N'>Deactive</option>
                                             onChange={(e)=>{
                                                  setIcm_user(e.target.value)
                                            }}
                                             </Input>
                                          

                                            :

                                            <Input id="icm_user" name="icm_user" type="select">
                                             <option value="" >--Select--</option>
                                             <option  value='Y'>Active</option>
                                             <option  value='N'>Deactive</option>
                                             onChange={(e)=>{
                                            setIcm_user(e.target.value)
                                        }}
                                             </Input>

                                            

                                        }
                                          
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="user_type"> User_Type</Label>
                                        {/* <Input id="user_type" name="user_type"  type="text"
                                       /> */}
                                        <Input id="user_type" name="user_type" type="select">
                                            <option value="">--Select--</option>
                                            

                                             <option value="admin">Admin</option>
											<option value="sales_manager">Sales Manager</option> 

{/* 
                                            {empdata2.map((e, key) => {
                                         return <option selected key={key} value={e.user_type}>{e.user_type}</option>;
                                                 })} */}
											
                                            onChange={(e)=>{
                                               
                                            setUser_type(e.target.value)
                                            
                                        }}
                                        </Input>
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