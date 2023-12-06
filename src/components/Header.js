import {React,useEffect,useState} from "react";
import {FiBell} from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import { CiSettings,CiLogin} from "react-icons/ci";
import {FaUserCircle} from "react-icons/fa";
import {FiChevronRight} from "react-icons/fi";
import {useNavigate} from 'react-router-dom';
import {Navbar,NavbarBrand ,NavLink,DropdownItem,UncontrolledDropdown,DropdownMenu,DropdownToggle} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import base_url from "../api/bootapi";

function Header(){
    const [name,setname]=useState();
    const [not_msg,setNot_msg]=useState([]);
    const [status,setStatus]=useState([]);
    const [not_length,setnot_length]=useState(0);
    const navigate=useNavigate();
    var fulllname="";
    var user_id="";
    useEffect(()=>
    { 
       
         let name=localStorage.getItem("emp_fullname");
        axios.get(`${base_url}/marketing_react?fullname=`+name).then(
            (response)=>{   
             
             // localStorage.setItem("n_value", );
              setnot_length(response.data.len);
              
            },
            (error)=>{
              console.log(error);
            },[]);





        const not_msgg=JSON.parse(localStorage.getItem("not_msg_list"));
        var emp_fulllname=localStorage.getItem("emp_fullname");
        fulllname=JSON.parse(emp_fulllname);
        setname(fulllname);
       
       

        var emp_code=localStorage.getItem("emp_menu");
        user_id=JSON.parse(emp_code);


        if(user_id === 'OMI-1045'){
       
            var a="Requested to RA";
            axios.get(`${base_url}/notification_sch_list_marketing?scheme_status=`+user_id).then(
                (response)=>{   
                 
                setNot_msg(response.data.DashbordApprover);
                setnot_length(response.data.len);
                },
                (error)=>{                  
                    console.log(error);
                },[]);

            
        }


       else if(user_id === 'OMI-1036'){
           
            var a="Requested to RA";
            axios.get(`${base_url}/notification_sch_list?scheme_status=`+a).then(
            (response)=>{   
       
                setNot_msg(response.data.DashbordApprover);
                setnot_length(response.data.len);
            },
            (error)=>{                  
                console.log(error);
            },[]);
            }

       else if(user_id === 'OMI-0076'){

            var a="Ready to launch";
            axios.get(`${base_url}/notification_sch_list?scheme_status=`+a).then(
                (response)=>{   
                    setNot_msg(response.data.DashbordApprover);
                    setnot_length(response.data.len);
                
                },
                (error)=>{                  
                    console.log(error);
                },[]);
        }

else{
    axios.get(`${base_url}/notification_sch_list_incentive?user_id=`+user_id).then(
        (response)=>{   
 
            setNot_msg(response.data.DashbordApprover);
            setnot_length(response.data.len);
        },
        (error)=>{                  
            console.log(error);
        },[]); 
}

},[]);

    const logout_test = () => {
      localStorage.clear();
      navigate("/");
    }
    return(
        <div class="nav-selections fixed-nav-bar">   
            <Navbar color="primary" dark style={{height: 56,width:"100%"}}>
                <NavbarBrand style={{marginTop:-10,marginLeft:830}}>
                <div className="d-flex justify-content-center">
                
                <UncontrolledDropdown  className="me-2">
                    <DropdownToggle style={{backgroundColor:'#0d6efd',border:'none'}}>
                        <FiBell style={{marginLeft:91}}/><div class="badge" style={{marginLeft:368,top:-9}}>{not_length}</div><BiChat style={{marginLeft:-332}}/>
                    </DropdownToggle>
                    <DropdownMenu style={{marginRight:-26,marginTop:1,width:330,height:300,opacity:1,overflowY: 'scroll'}}>
                    <DropdownItem  >
                      {
                          not_msg.map((lk,index)=>{                                
                                return    <NavLink><FiChevronRight/><span style={{marginLeft:15}}><a href={`/schemedetails?scheme_id=${lk.scheme_id}`}>{lk.wf_notification_msg}</a></span></NavLink> 
                               // return    <NavLink><FiChevronRight/><span style={{marginLeft:15}}><a href={`/schemedetails?scheme_id=${user.scheme_id}`}>{lk.wf_notification_msg}</a></span></NavLink> 
                            },[])
                      }
                   </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

            </div>
                  
                </NavbarBrand>
                <NavbarBrand style={{marginTop:-10}} >
                <div className="d-flex justify-content-center">
                
                    <UncontrolledDropdown className="me-2">
                        <DropdownToggle caret style={{backgroundColor:'#0d6efd',border:'none'}}>
                            <FaUserCircle style={{width:21 , height:25,marginLeft:-42,marginTop:-3}}/><span style={{marginLeft:20}}>{name}</span>
                        </DropdownToggle>
                        <DropdownMenu style={{marginRight:-26,marginTop:1,width:192}}>
                            <DropdownItem>
                                <NavLink href=""><CiSettings/><span style={{marginLeft:15}}>Setting</span></NavLink>
                            </DropdownItem>
                            <DropdownItem >
                                <NavLink href=""><FaUserCircle/><span style={{marginLeft:15}}>Profile</span></NavLink>
                            </DropdownItem>
                            <DropdownItem >
                                <NavLink href=""><BiChat/><span style={{marginLeft:15}}>My Message</span></NavLink>
                            </DropdownItem>
                            <DropdownItem >
                                <NavLink  onClick={logout_test}><CiLogin/><span style={{marginLeft:15}}>Logout</span></NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
  
                </div>
                </NavbarBrand>
            </Navbar>
        </div>
    );
}

export default Header;