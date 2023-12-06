import {React,useEffect,useState} from "react";
import {Card,CardText,CardFooter,CardBody,CardTitle, Row, Col,CardLink, CardGroup, Button,Spinner} from 'reactstrap';
import axios from "axios";
import base_url from "../api/bootapi";
import My_Chart from "./mychart";
import Header from "./Header";
import Menus from "./Menus";
import PieChart from "./PieChart";
import { BsFillBarChartFill } from "react-icons/bs";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard_Copy=(props)=>{
    const [course,setCourses]=useState([]);
    
    let studentsArray = [];
    const styles = {
        main: {
        border:"1px solid white", 
        height:100,
        width:320,
        marginTop:30  
        }, 
        anchor: {
            color: "white" ,
            textDecoration:"none", 
            marginTop:1,
            fontSize: 30
        }, 
        card_text: {
            color: "white" ,
            textDecoration:"none",
            marginTop:10,
            fontSize: 17       
        },
             
    };
    
   
    useEffect(()=>{
       
      
       
        document.getElementById("spinner").style.display = 'block';
        var emp_id=localStorage.getItem("emp_id");
        var emp_id2=JSON.parse(emp_id);
        //var emp_id=46;
        axios.get(`${base_url}/dash_copy?emp_id=`+emp_id2).then(
            (response)=>{   
              setCourses(response.data);
              //console.log(response.data);
               document.getElementById("spinner").style.display = 'none';
            },
            (error)=>{
                console.log(error);
            },[]);

        axios.get(`${base_url}/graph_react`).then(
                (response)=>{   
                  console.log(response.data);
                },
                (error)=>{                  
                    console.log(error);
                },[]);
    }
    ,[]);

    
    return(
        <div> 
            <Header/>
              <Row>
        <Col md={3} >

        <Menus />
        </Col>
        <Col md={9} style={{marginLeft:297}}>
            <Spinner color="primary" id="spinner" style={{marginLeft:444 ,marginTop:70,display:'block'}}>Loading...</Spinner>   
           
            <Row style={{marginTop:53}}>
          
                <Col sm="4">
                
                    <Card className="text-white bg-cyan" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor} >{new Intl.NumberFormat('en-IN').format(course.sch_size)}</CardLink></CardTitle> <CardText style={styles.card_text}>Total Schemes</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

                <Col sm="4" >
                    <Card className="text-white bg-ak" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  >{new Intl.NumberFormat('en-IN').format(course.totel_sell)}</CardLink></CardTitle><CardText>Total Sells</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

                <Col sm="4">
                    <Card className="text-white bg-pink" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  >{new Intl.NumberFormat('en-IN').format(course.total_incentive)}</CardLink></CardTitle><CardText>Total Incentive</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>
              

              
            </Row> 
            <Row style={{marginTop:-6}}>
              
            <Col sm="4" >
                    <Card className="text-white bg-blue" style={styles.main}>
                        <CardBody style={{color:"white"}}><CardTitle tag="h5"><CardLink style={styles.anchor} >{new Intl.NumberFormat('en-IN').format(course.adjust_amt)}</CardLink></CardTitle><CardText> Total Bonus</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>
                <Col sm="4">
                    <Card className="text-white bg-pink1" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  >{new Intl.NumberFormat('en-IN').format(course.payout)}</CardLink></CardTitle> <CardText>Total Payout</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

              

            </Row> 
        
                       <Row style={{marginTop:57}}>
                            <Col sm="9" style={{width:700,height:100}}><My_Chart/></Col> 
                            <Col sm="3" style={{marginRight:18,width:400,height:100,marginLeft:635,marginTop:-96}}><PieChart/></Col>         
                       </Row>  
           </Col>
          
          </Row>  
               
</div>
)}
export default Dashboard_Copy;