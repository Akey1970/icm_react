import {React,useState} from "react";
import {Card,CardTitle,CardText,Button,FormGroup,Label,Input} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import base_url from "../api/bootapi";
import 'react-toastify/dist/ReactToastify.css';


const ForgotPass=(props)=>{
    const [userdetails,setUserdetails]=useState({});
    const navigate=useNavigate();

    const redirectlogin=()=>{
    axios.post(`${base_url}/resetsubmit_usingreact`,userdetails).then(
      (response)=>{
          console.log(response);             
           navigate("/");
      },
      (error)=>{
          console.log(error);
      })}

    return(
        <div style={{width: 450,height:400,marginLeft:450,marginTop:120}}>
            <Card body className="my-2 text-center" style={{ width: 450,height:379}}>
              <CardTitle tag="h5" style={{marginTop:20}}>New Password</CardTitle>
              <CardText>
                  <FormGroup>
                    <Label for="password" style={{marginLeft:-313,marginTop:27}}>New Password</Label>
                    <Input id="password" name="password" type="password" onChange={(e)=>{
                      setUserdetails({... userdetails,password:e.target.value,user_name:props.username})
                    }}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cpassword" style={{marginLeft:-293}}>Confirm Password</Label>
                    <Input id="cpassword" name="cpassword" type="password"/>
                  </FormGroup>
                  <FormGroup>
                    <Input id="user_name" name="user_name" type="hidden"/>
                  </FormGroup>
              </CardText>
              <Button color="primary" onClick={redirectlogin} style={{marginTop:18}}>Submit</Button>
            </Card>
         </div>   
   )
}
export default ForgotPass;