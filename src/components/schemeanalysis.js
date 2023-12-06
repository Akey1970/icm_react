import {React, useState, useEffect} from "react";
import {Card,CardText,CardBody,Button,CardHeader,Form,Row,Col,FormGroup,Label,Input,Navbar,NavbarBrand} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import CountriesTables_Analysis from "./CountriesTables_analysis";
import User_Incentive_Analysis from "./User_Incentive_Analysis;";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountriesTables from "./CountriesTables";


const Scheme_Analysis=()=>{

    const [schemename, setSchemename]=useState([]);
    const [isAdmini, setIsAdmini] = useState(false);
    var emp_code="";
    function showreport(){
        console.log('showreport');
    }
    useEffect(()=>{

        var emp_c=localStorage.getItem("emp_menu");
        emp_code=JSON.parse(emp_c);
        if(emp_code==='OMI-1045'){
            setIsAdmini(true);
           
        }
        axios.get(`${base_url}/loadicmschemename?emp_code=`+emp_code).then(
              
          (response)=>{ 
            
            console.log(response.data);
            setSchemename(response.data);
            
          },
          (error)=>{
              console.log("schemename "+error);
          },[]);
    
    },[]);

    return(
        <>  
               <Header/>
               <Row>
                   <Col md={3}>
                         <Menus/>
                   </Col>
                   <Col md={9} style={{marginLeft:-71,height:"100%",marginTop:60}}>        
                        <Form>
                          

                                <Card  style={{width: '66rem',height:"100%",marginTop:20}}>
                                        <CardHeader  style={{backgroundColor: '#2677c145'}}>
                                            <h6 style={{color:'#505458'}}>Scheme Analysis</h6>                                           
                                        </CardHeader>
                                        <CardBody>                
                                            <CardText>                                           
                                                {/* <CountriesTables_Analysis/> */}
                                                {/* <User_Incentive_Analysis/> */}
                                                {isAdmini? 
                                                
                                                    <CountriesTables_Analysis/>
                                                    
                                                 : 
                                                    <User_Incentive_Analysis/>
                                                }



                                            </CardText>                                                         
                                        </CardBody>
                                </Card>
                        </Form>
                    </Col>
                </Row>
        </>
    )
}
export default Scheme_Analysis;