import {React, useState, useEffect} from "react";
import {Card,CardTitle,CardText,Button,FormGroup,Label,Input} from "reactstrap";
import { Link,useNavigate} from 'react-router-dom';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Otppage=(props)=>{


  const navigate=useNavigate();
  let confirm_otp="";

  const [votp, setVotp]=useState("");
  const forgetpass=()=>{
    alert(props.otp.ou);
    if(votp===props.otp.ou){
      alert("correct");
      navigate("/forgotpass2");

    }else{

      alert("not correct");
    }

    //navigate("/forgotpass2");
  }
   
    return(
        <div 
        style={{
            width: 450,
            height:311,
            marginLeft:450,
            marginTop:120
          }}
        >
             
            
  <Card
    body
    className="my-2 text-center"
    style={{
        width: 450,
        height:379   
    }}
  >
    <CardTitle tag="h5" 
    style={{marginTop:20}}
    >
      Forgot Password
    </CardTitle>
    <CardText>
    <FormGroup>
    <Label for="otp"
    style={{marginLeft:-335,marginTop:27}}
    >
      Enter OTP
    </Label>
    <Input
      id="otp"
      name="otp"
      type="text"
      onChange={(e)=>{
        setVotp(e.target.value)
      }}
    />
  </FormGroup>
  
    </CardText>
    <Button type="button" color="primary" onClick={forgetpass}
    style={{marginTop:18}}>
      Submit
    </Button>
  </Card>
 
</div>     
    )

}
export default Otppage;