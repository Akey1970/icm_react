import {React,useEffect,useState} from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import {FiAlignJustify,FiChevronRight} from "react-icons/fi";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiSidebar } from "react-icons/fi";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Menus=()=>{
  const [menuitem,setmenuitems]=useState([""]);
  const [menu,setmenu]=useState([]);
  useEffect(()=>
  { 
    var menu_string=localStorage.getItem("emp_menu");
    var emp_menu_password=localStorage.getItem("emp_menu_password");
    var menu2=JSON.parse(menu_string);
    var menu3=JSON.parse(emp_menu_password);
    setmenu(menu2);

    const menu_list=localStorage.getItem("menu_list");
    

    const menu_json=JSON.parse(menu_list)
    console.log("type offf menu items");
    console.log(typeof(menu_json));
    setmenuitems(menu_json);

    //console.log(menuitem);
    
    // axios.get(`${base_url}/berger_login_test_react?user_name=`+menu2+`&password=`+menu3).then( 
    //     (response)=>{   
    //       setmenuitems(response.data);
    //     },
    //     (error)=>{
    //        console.log(error);
    //     },[]);
      },[]);
    return(
          <div>


<Sidebar  style={{backgroundColor:'#b3b3b3',height:"120vh",marginTop:49}} >
                  <Menu >                   
                    {menuitem !== null &&
                      

                    
                        menuitem.map((arr) => {
                              
                              return Object.prototype.toString.call(arr.bml) === '[object Array]' ?
                              <>
                                    <SubMenu label={arr.Menu_Header}>
                                    {
                                          arr.bml.map((lk)=>{
                                            return <MenuItem href={"/"+lk.action_name}><FiChevronRight/><span style={{marginLeft:10}}>{lk.line_name}</span></MenuItem>
                                          },[])
                                    }
                                  </SubMenu>            
                              </>
                              
                              :
                   
                              <MenuItem href={"/"+arr.actionname}>< FiSidebar/>  {arr.Menu_Header} </MenuItem>
                        },[])
                    }
                    
                  </Menu>
            </Sidebar>
        

          </div>
              



    )
};


export default Menus;