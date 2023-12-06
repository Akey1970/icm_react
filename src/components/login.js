import {React,useState} from "react";
import {Form,FormGroup,Label,Input,Button,Image,Spinner} from "reactstrap";
import MyImage from '../images/tvs.png';
import MyBackImg from '../images/dev.jpg';
import axios from "axios";
import base_url from "../api/bootapi";
import {useNavigate} from 'react-router-dom';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login_Form=(props)=>{
  const navigate=useNavigate();
  const [course_count,setCourses_Count]=useState([]);
  const [course,setCourses]=useState({});
  let user_fullname="";
  const usernamevalidation=(e)=>{
    e.preventDefault();
    var res_otp="";
    
    if(course.emp_code === "" || course.emp_code === undefined){
      
      toast('Plese Enter User Name');
     
     
    }else{

      axios.get(`${base_url}/checkusernameExistOrnot?userName=`+course.emp_code).then(
        (response)=>{   
          console.log(response.data);
          res_otp=response.data;
          props.aler(res_otp,course.emp_code);
          toast('OTP Sent successfully');
          navigate("/forgotpass");
        },
        (error)=>{
            toast('user does not exists');
        },[]);

    }
    
  }

  const handleFormsubmit=(e)=>{
     
    postDataToServer();
      e.preventDefault();
  };
  const postDataToServer=()=>{
 
    document.getElementById("spinner").style.display = 'block';
    if(course.emp_code === undefined && course.password === undefined){
      toast('Plese Enter Your Credentials');
    }
    else if(course.emp_code === ""|| course.emp_code===undefined){  
      toast('Plese Enter UserName'); 
   }else if(course.password === ""|| course.password===undefined){
     toast('Plese Enter Password');
   }
    else{

      axios.post(`${base_url}/berger_login6`,course).then(
        (response)=>{
         console.log("berger_login6 response___"); 
         console.log(response.data);
         if(response.data.status==="Y"){
           props.alerfullname(response.data.fullname,response.data.emp_code,response.data.password);
           console.log(response.data);
            localStorage.setItem("emp_menu", JSON.stringify(response.data.emp_code));
            localStorage.setItem("emp_menu_password", JSON.stringify(response.data.password));
            localStorage.setItem("emp_fullname", JSON.stringify(response.data.fullname));
            localStorage.setItem("emp_id", JSON.stringify(response.data.empid));
            user_fullname=response.data.fullname;
 
            //setmenu(menu2);
            axios.get(`${base_url}/berger_login_test_react?user_name=`+response.data.emp_code+`&password=`+response.data.password).then( 
                (response)=>{   
                  localStorage.setItem("menu_list",JSON.stringify(response.data));
 
 
                 console.log("the full name data send to API marketing_react___"+response.data.fullname);
                  axios.get(`${base_url}/marketing_react?fullname=`+user_fullname).then(
                   (response)=>{   
                     setCourses_Count(response.data);
                     console.log("header login API : ") 
                     console.log(response.data);
                     localStorage.setItem("n_value", JSON.stringify(response.data.len));
                     localStorage.setItem("not_msg_list",JSON.stringify(response.data.DashbordApprover));
                     var emp_id=localStorage.getItem("emp_id");
                     emp_id=JSON.parse(emp_id);
                     //alert(emp_id);
                     if(emp_id==40 ||emp_id==3 ||emp_id==34){
                         document.getElementById("spinner").style.display = 'none';
                      navigate("/marketing");
                     }
                     else{
                      navigate("/dashcopy");
                     }
                     
                   },
                   (error)=>{
                     console.log(error);
                   },[]);
            
                },
                (error)=>{
                   console.log(error);
                },[]);
 
            
         }else{
           toast('logined Failed!!');
         }
        },
        (error)=>{
            toast('logined Failed!!');
            console.log(error);         
        }
     )
    }

}

//  const onButtonClick = () => {
//         fetch('SamplePDF.pdf').then(response => {
//             response.blob().then(blob => {
//                 const fileURL = window.URL.createObjectURL(blob);
//                 let alink = document.createElement('a');
//                 alink.href = fileURL;
//                 alink.download = 'SamplePDF.pdf';
//                 alink.click();
//             })
//         })
//     }

    return(
        <div className="text-center" style={{ backgroundImage:`url(${MyBackImg})`,backgroundRepeat:"no-repeat",width:'100%',height:619}}>
        <div>
          <br />
        <h1 style={{marginLeft:27,animationName:'example',color:'#f5f0f0',marginBottom:54}}>Incentive Calculation Management</h1>
        </div>
        
        <div style={{marginLeft:474,marginRight:500,width:450,height:450,marginTop:27,backgroundColor:"#f5f6f7",opacity:2.0 }}>
        <img src={MyImage} alt="horse" style={{marginTop:39}} />
        <Form onSubmit={handleFormsubmit}>
            <FormGroup>
              <Label for="exampleEmail" style={{marginLeft:-299,marginTop:25}}>Username</Label>
              <Input
                id="exampleEmail"
                name="email"
                type="text"
                onChange={(e)=>{
                  setCourses({... course,emp_code:e.target.value})
              }}
                style={{marginLeft:43,width:365}}

              />
            </FormGroup>
  
            <FormGroup>
              <Label
                for="examplePassword"
                style={{marginLeft:-299,marginBottom:10}}
              >
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"     
                type="password"
                onChange={(e)=>{
                  setCourses({... course,password:e.target.value})
              }}
                style={{marginLeft:43,width:365}}
              />
            </FormGroup>
            <FormGroup check>
              <Input
                id="exampleCheck"
                name="check"
                type="checkbox"
                style={{marginLeft:30,border:"1px solid #3498db"}}
              />
              <Label
                check
                for="exampleCheck"
                style={{marginLeft:-46}}
              >
                Remember Me
              </Label>

              <Label
                check
                for="exampleCheck"
                style={{marginLeft:75}}
              >
                <a href="/forgotpass" onClick={usernamevalidation}>Forgot Password?</a>
              </Label>
            </FormGroup>
            <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:10,marginLeft:211,display:"none"}}>Loading...</Spinner>
            <ToastContainer />
            
            {/* <button onClick={onButtonClick} hidden> Download PDF</button> */}
            <Button type="submit" style={{marginTop:40,width:324,backgroundColor:'rgb(56 142 171)',border:"none"}}>Submit</Button>
      </Form>  
      </div>
      </div>

    );
}
export default Login_Form;