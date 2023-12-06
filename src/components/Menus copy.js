import {React,useEffect,useState} from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Link } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import { ListGroup, ListGroupItem ,Nav,NavItem,NavLink} from 'reactstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const Menus=()=>{
  const [menuitem,setmenuitems]=useState([]);
 

  useEffect(()=>
  { //`${base_url}/berger_login_test_react`
    axios.get(`${base_url}/berger_login_test_react?user_name=OMI-1045&password=Omfys@123`).then( 
        (response)=>{   
          console.log("Menu Console  ");
          console.log(response);
          setmenuitems(response.data);
        
        },
        (error)=>{
            alert(error);
        },[]);
      });
    return(
        
        // <ListGroup>
        //     <Link  className="list-group-item list-group-item-action" tag="a" to="/" action>Home </Link>
        //     <Link className="list-group-item list-group-item-action" tag="a" to="/add-course" action>Add Course </Link>
        //     <Link className="list-group-item list-group-item-action" tag="a" to="/view-courses" action>View Courses </Link>
        //     <Link className="list-group-item list-group-item-action" tag="a" to="#!" action>About Us </Link>
        //     <Link className="list-group-item list-group-item-action" tag="a" to="#!" action>Contact Us </Link>
        // </ListGroup>

        
<div style={{backgroundColor:'#e4e5e7',height:"100%",color:"white"}}> 
        <Nav vertical>
            {/* <NavItem>
                <NavLink href="/about">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/schemedetails">Scheme_Details</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/createScheme">Another Link</NavLink>
            </NavItem> */}

           {/* {
              menuitem.map((item)=><NavItem><NavLink href="/{item.actionname}">{item.Menu_Header}<BiChevronDown style={{marginLeft:20}}/></NavLink></NavItem>)
           } */}


        </Nav>
       
</div>
    )
};
export default Menus;
<Sidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>;
