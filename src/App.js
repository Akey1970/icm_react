import './App.css';
import {React,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login_Form from './components/login';
import ForgotPass from './components/ForgotPass';
import Otppage from './components/Otppage';
import Dashboard from './components/dashboard';
import Scheme_Details from './components/schemedetails';
import Scheme_Analysis from './components/schemeanalysis';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import CreateScheme from './components/createscheme';
import SchemeRequest from './components/SchemeRequest';
import Person from './components/Person';
import CountriesTables_Analysis from './components/CountriesTables_analysis';
import Incentivereport from './components/Incentivereport';
import Icm_Scheme_Master from './components/Icm_Scheme_Master';
import Dashboard_Copy from './components/dashboardcopy';
import Congiguration_SetUp from './components/Congiguration_SetUp';
import Abc from './components/Abc';
import UserSetup from './components/UserSetup';
import ViewUserDetails from './components/ViewUserDetails';
import ConfDetails from './components/ConfDetails';
import Call_Opa from './components/Call_Opa';
import Calendar from 'react-calendar';
import ApprovedListIncen from './components/ApprovedListIncen';
import RejectedListIncen from './components/RejectedListIncen';
function App() {
  const data="Yoshita";
  const [ou,setOu]=useState("");
  const [uname,setUname]=useState("");
  const [fullname,setFullname]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  //schemedetailsoficm?scheme_id=28

  function login_alert(gh,ph){
    setOu(gh);
    setUname(ph);    
  }

  function fullname_test(gh,username,password){
    setFullname(gh);
    setUsername(username);
    setPassword(password);   
  }

  return (
    <>    
     <Router>  
          <Routes> 
              <Route exact path="/usersetup" element={<UserSetup/>}/> 
              <Route exact path="/userdetails" element={<ViewUserDetails/>}/>     
              <Route exact path="/confsetup" element={<Congiguration_SetUp/>}/> 
              <Route exact path="/confdetails" element={<ConfDetails/>}/>
              <Route exact path="/callopa" element={<Call_Opa/>}/>    
              <Route exact path="/cal" element={<Calendar/>}/>     
              <Route  path="/" element={<Login_Form aler={login_alert} alerfullname={fullname_test} />}/>
              <Route  path="/marketing" element={<Dashboard name={{fullname:fullname,username:username,password:password}}/>}/> 
              <Route  path="/forgotpass" element={<Otppage otp={{ou:ou,uname:uname}}/>}/>
              <Route exact path="/forgotpass2" element={<ForgotPass username={uname}/>}/> 
              <Route exact path="/hitdrools" element={<Icm_Scheme_Master/>}/> 
              <Route exact path="/schemedetails" element={<Scheme_Details/>}/>  
              <Route exact path="/schemeanalysisrestcrm" element={<Scheme_Analysis/>}/> 
              <Route exact path="/NewSchmReq" element={<CreateScheme/>}/> 
              {/* <Route exact path="/schemerequest" element={<SchemeRequest/>}/>  */}
              <Route exact path="/analysis" element={<CountriesTables_Analysis/>}/> 
              {/* <Route exact path="/incentivereport" element={<Incentivereport />}/>  */}
              <Route exact path="/dashcopy" element={<Dashboard_Copy/>}/> 
              <Route exact path="/approvedincen" element={<ApprovedListIncen/>}/> 
              <Route exact path="/rejectedincen" element={<RejectedListIncen/>}/> 
              <Route exact path="/incentivemaster" element={<Incentivereport/>}/> 
          </Routes>                 
      </Router>
    </>
  );
}

export default App;
