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

const Dashboard=(props)=>{
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
        var full_name=localStorage.getItem("emp_fullname");
        var full_name_2=JSON.parse(full_name);

        axios.get(`${base_url}/marketing_react?fullname=`+full_name_2).then(
            (response)=>{   
              setCourses(response.data);
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
            <Spinner color="primary" id="spinner" style={{marginLeft:444 ,marginTop:60,direction:'block'}}>Loading...</Spinner>   
            <Row style={{marginTop:53}}>
                <Col sm="4">
                    <Card className="text-white bg-cyan" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor} href={`/hitdrools?active_flag=Incomplete`}>{course.incomplete}</CardLink></CardTitle> <CardText style={styles.card_text}>Created Schemes</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

                <Col sm="4" >
                    <Card className="text-white bg-ak" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  href={`/hitdrools?active_flag=Requested to RA`}>{course.approvalpending}</CardLink></CardTitle><CardText>Requested to RA</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

           
                <Col sm="4" >
                    <Card className="text-white bg-blue" style={styles.main}>
                        <CardBody style={{color:"white"}}><CardTitle tag="h5"><CardLink style={styles.anchor}  href={`/hitdrools?active_flag=Ready to launch`}>{course.launch}</CardLink></CardTitle><CardText>Ready To Launch</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>

              
            </Row> 
            <Row style={{marginTop:-6}}>
              
           
                <Col sm="4">
                    <Card className="text-white bg-pink1" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  href={`/hitdrools?active_flag=active`}>{course.active}</CardLink></CardTitle> <CardText>Active</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>
                <Col sm="4">
                    <Card className="text-white bg-pink1" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  href={`/hitdrools?active_flag=rewarded`}>{course.rewarded}</CardLink></CardTitle> <CardText>Rewarded</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
                        {/* <CardFooter style={styles.main}>update : {currDate }  { currTime}</CardFooter> */}
                    </Card>
                </Col>
                <Col sm="4">
                    <Card className=" text-white bg-purple" style={styles.main}>
                        <CardBody><CardTitle tag="h5"><CardLink style={styles.anchor}  href={`/hitdrools?active_flag=closed`}>{course.freezed}</CardLink></CardTitle><CardText>Closed</CardText><BsFillBarChartFill style={{marginTop:-101,marginLeft:163,height:33,width:180}}/></CardBody>
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
export default Dashboard;