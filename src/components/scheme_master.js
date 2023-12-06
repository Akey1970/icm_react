import React, { useState, useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { ListGroup,Button } from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Scheme_Master=()=>{
    const navigate=useNavigate();
    
    return (
        <>
        <h1 style={{color:"green"}}>GeeksForGeeks</h1>
        <button onClick={()=>navigate("/marketing")}>About</button>
      </>
    
    );
}
export default Scheme_Master;
 