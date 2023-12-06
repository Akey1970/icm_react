import './App.css';
import {React,useState} from "react";
import CountriesTables from './components/CountriesTables';
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
              <Route exact path="/incentivereport" element={<Incentivereport />}/> 
              <Route exact path="/dashcopy" element={<Dashboard_Copy/>}/> 
          </Routes>                 
      </Router>
    </>
  );
}

export default App;
