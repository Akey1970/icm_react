import {React,useState,useEffect} from "react";
import {Card,CardBody, Row, Col,CardHeader,Form,FormGroup,Input,Label,Button,Table,Spinner} from 'reactstrap';
import Header from "./Header";
import Menus from "./Menus";
import base_url from "../api/bootapi";
import axios from "axios";
import $ from 'jquery';
import FormData from 'form-data';
import Multiselect from 'multiselect-react-dropdown';
import {useNavigate} from 'react-router-dom';
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Createscheme=()=>{
    
    const [count,setCount]=useState(1);
    const [fullname,setFullname]=useState();
    const [created_on,setCreated_on]=useState();
    const [sscheme_fin_yr,setsscheme_fin_yr]=useState();
    const [counter, setCounter] = useState(1);
    const [counter_3, setCounter_3] = useState(0);
    const [tdar,setTdar]=useState([]);
    const [visible, setVisible] = useState(false); 
    const [tab_data,setTab_data]=useState([]);
    const [schemedata,setSchemedata]=useState([]);
    const [state_data,setState_data]=useState([]);
    const [city_data,setCity_data]=useState([]);
    const [country, setCountry] =  useState([]);
    const [max_schm_name, setMax_schm_name] =  useState([]);
    const [filedata, setFiledata] =  useState([]);
    const [foption_2, setFoption_2] =  useState([]);
    const [region, setRegion] = useState([]);
    const [selected_2, setSelected_2] = useState([]);
    const [name,setname]=useState();
    const navigate=useNavigate();
    var fulllname="";

    function on_state_sel(){
        const Z = JSON.stringify(foption_2);
    }

    function city_select(){
         const ZZ = JSON.stringify(foption_2);
     }

     function addall(){
       
        region.map((lkl)=>{
          axios.get(`${base_url}/loadcity?name=`+lkl.name).then(
            (response)=>{   
             
              let counter=0;
             // setFoption_2([...foption_2,{ name: lkl.name, id: lkl.name}]);
           
            setFoption_2(prevArr => [...prevArr,{name: lkl.name, id: lkl.name}]);
              console.log(response.data);
              response.data.map((lk)=>{
    
                const timeout = setTimeout(() => {
                  setCounter_3(counter_3 + 1);
                }, 1000);
                console.log(lk.city_name);
               // setRegion(lk.state_name);
               //setSelected_2([...selected_2,{ id:counter_3,name:lk.city_name,state:e.target.value}]);
               setSelected_2(prevArr => [...prevArr,{ id:counter_3,name:lk.city_name,state:lkl.name}])
               
              });
              
              // console.log(response.data);
              // setCourses(response.data);
              //document.getElementById("spinner").style.display = 'none';
             // document.getElementById("spinner").style.display = 'block';
            },
            (error)=>{
                console.log(error);
            },[]);  
            

        });
        



    }

    function removeall(){
        setFoption_2([]);

        setSelected_2([]);
        
    }
    function setdepots(e){
      axios.get(`${base_url}/loadcity?name=`+e.target.value).then(
        (response)=>{   
          setFoption_2([...foption_2,{ name: e.target.value, id: e.target.value}]);
          response.data.map((lk)=>{
           setSelected_2(prevArr => [...prevArr,{ id:counter_3,name:lk.city_name,state:e.target.value}])           
          });
        },
        (error)=>{ console.log(error)},[]);         
      }
    const onFileChangeHandler = (e) => { 
        document.getElementById("spinner").style.display = 'block';
       if(counter>1){
        
        // e.preventDefault();
        const di = document.getElementById('start_date').value;
       
        var arr = new Array();
         arr= di.split('-');
       let start_dt_reverse="";
 
        for(let i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
        if(i === arr.length - 1){
         start_dt_reverse=start_dt_reverse+arr[i]+"-";
        } 
        else if(i === arr.length - 2){
         start_dt_reverse=start_dt_reverse+arr[i]+"-";
        } else{
         start_dt_reverse=start_dt_reverse+arr[i];
 
        }
      }
 
 
      const end_di = document.getElementById('end_date').value;
        
      var end_arr = new Array();
      end_arr= end_di.split('-');
     let end_dt_reverse="";
 
      for(let i = end_arr.length - 1; i >= 0; i--) {
      console.log(end_arr[i]);
      if(i === end_arr.length - 1){
         end_dt_reverse=end_dt_reverse+end_arr[i]+"-";
      } 
      else if(i === end_arr.length - 2){
         end_dt_reverse=end_dt_reverse+end_arr[i]+"-";
      } else{
         end_dt_reverse=end_dt_reverse+end_arr[i];
 
      }
    }
 
      
         const formData = new FormData();
         foption_2.map((lk,index)=>{
              setState_data(prevArr => [...prevArr,lk.name])},[]);   
              
         for (const [key, value] of Object.entries(schemedata)) {
             if (value) {
                formData.append(key, value)
             }
           }
            
           const V = JSON.stringify(foption_2);
           const V1 = JSON.stringify(selected_2);
           const fin_yr = JSON.stringify(sscheme_fin_yr);
 
           console.log("state data with single quote___ "+V);
 
           formData.append("state_data", V);
           formData.append("city_data", V1);
           formData.append("active_flag", "Incomplete");
           formData.append("scheme_fin_yr", fin_yr);
           
           formData.append("created_by", fullname);
           formData.append("created_on", created_on);
           formData.append("start_date", start_dt_reverse);
           formData.append("end_date", end_dt_reverse);
           setTdar(prevArr => [...prevArr,{id:100,elgibl_to:"elgibl_to",based_on:"based_on",typeofac:"typeofac"}]);
           const x = JSON.stringify(tdar); 
           console.log("the json table_data "+x);
           formData.append("table_data", x);
           console.log("form data save");
           console.log(formData);
            axios({
             method: "post",
             url: "http://localhost:8090/icm_savescheme_request_react",
             data: formData,
             headers: { "Content-Type": "multipart/form-data" },
           })
             .then(function (response) {
                document.getElementById("spinner").style.display = 'none';
                 toast.success("scheme saved successfully");
                 
                 navigate("/schemedetails?scheme_id="+response.data);
             })
             .catch(function (response) {
                 console.log(response);
             });

       }else{

        alert("Please Add atleast one row for eligibility");

       }
       
       
        };
    
    useEffect(()=>
    {

      
        var emp_fulllname=localStorage.getItem("emp_fullname");   
        setname(JSON.parse(emp_fulllname));

        var fullname = localStorage.getItem("emp_fullname");
        var fullname_2=JSON.parse(fullname);
        setFullname(fullname_2);
  
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        setsscheme_fin_yr(year);
        var created_on=date+"-"+month+"-"+year;
        setCreated_on(created_on);

        axios.get(`${base_url}/loadcountry`).then(
            (response)=>{   
                    setCountry(response.data);          
            },
            (error)=>{
                    console.log(error);
            },[]);

        axios.get(`${base_url}/loadmaxschm_id`).then(
                (response)=>{  
                    console.log("loadmaxschm_id");  
                    setMax_schm_name(response.data[0].scheme_id); 
                    
                           
                },
                (error)=>{
                        console.log(error);
                },[]);
    },[]);

    const handleForm=(e)=>{
        postDataToServer(schemedata);
        e.preventDefault();
    };

    function onRemove(selectedList, removedItem) {
        setSelected_2(selected_2.filter(item => item.state !== removedItem.name));
        setFoption_2(foption_2.filter(item => item.name !== removedItem.name));
    }

    function onRemove_city(selectedList, removedItem) {
        setSelected_2(selected_2.filter(item => item.name !== removedItem.name));
        setFoption_2(foption_2.filter(item => item.name !== removedItem.state));
    }
    const postDataToServer=(data)=>{
         axios.post(`${base_url}/icm_savescheme_request_react`,data).then(
            (response)=>{
            },
            (error)=>{             
            }
         )
    }
    const handleAddRow=()=>{
        setVisible(true);
        let scheme_name = document.getElementById('scheme_name').value;
        let elgibl_to = document.getElementById('elgibl_to').value;
        let based_on = document.getElementById('based_on').value;
        let typeofac = document.getElementById('typeofac').value;
        if(counter<=2){
                setTdar([...tdar,{id:counter,scheme_name:scheme_name,elgibl_to: elgibl_to,based_on: based_on,typeofac: typeofac,scheme_id:max_schm_name}]); 
                setCounter(counter+1);   
            
        }

       
    }

    function state_sel(e){
        setSchemedata({... schemedata,region:e.target.value})
        axios.get(`${base_url}/loadstate_reg?name=`+e.target.value).then(
        (response)=>{   
          setRegion([]);
          response.data.map((lk)=>{
            setRegion(prevArr => [...prevArr,{ name: lk.state_name}])
          });
        },
        (error)=>{
            console.log(error);
        },[]);

    }
    const [schemedata_react,setSchemedata_react]=useState({});

    const handleDelete=(index,e)=>{

        if(counter > 1)
        { 					
            setTdar(tdar.filter((v, i) => i !== index));
            setCounter(counter -1); 
            if(counter==2){
                setVisible(false);	
            }
            else{
                setVisible(true);	
            }
            			 
        }
   
    }
    return(
        <div>
        <Header/>
        <Row><Col md={3}><Menus/></Col>
        <Col md={9} style={{marginLeft:-71,marginTop:51}}>
           <Form id="example-advanced-form" onSubmit={handleForm}>
            <Card style={{ width: '66rem',height:"100%",marginTop:30}}>
                <CardHeader style={{color:"#353c4e",marginTop:"10",height:40,backgroundColor:"#2677c145"}}><h6 style={{marginTop:3}}>Create Scheme</h6></CardHeader>
                <CardBody>               
                    <Form>
                         <Row>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="scheme_name">Scheme Name</Label>
                                        <Input id="scheme_name" name="scheme_name"  type="text" 
                                        onChange={(e)=>{ setSchemedata({... schemedata,scheme_name:e.target.value})}}/>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="scheme_fin_yr">Fin Year</Label>
                                        <Input id="scheme_fin_yr" name="scheme_fin_yr" type="text" value={sscheme_fin_yr} style={{backgroundColor:"#f1f1f3"}}
                                        readOnly/>
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="start_date">EffectiveDate From</Label>
                                        <Input id="start_date" name="start_date" placeholder="date placeholder" type="date"
                                         />
                                    </FormGroup>
                             </Col>
                             <Col md={3}>
                                    <FormGroup>
                                        <Label for="end_date">EffectiveDate To</Label>
                                        <Input id="end_date" name="end_date" placeholder="date placeholder" type="date"
                                       />
                                    </FormGroup>
                             </Col>
                         </Row>                        
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                        <Label for="active_flag">Scheme Status</Label>
                                        <Input id="active_flag" name="active_flag"  type="text" value="Incomplete" style={{backgroundColor:"#f1f1f3"}}
                                        onChange={(e)=>{ setSchemedata({... schemedata,active_flag:e.target.value})}} readOnly/>   
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label for="computation_cycle">Computation cycle</Label>
                                        <Input id="computation_cycle" name="computation_cycle" type="select"
                                        onChange={(e)=>{ setSchemedata({... schemedata,computation_cycle:e.target.value})}} >
                                            <option>--Select--</option>
                                            <option value="annually">Annually</option>
											<option value="quarterly">Quarterly</option>
											<option value="monthly">Monthly</option>
        
                                        </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label for="payout_cycle">Payout Cycle</Label>
                                        <Input id="payout_cycle" name="payout_cycle" type="select"
                                        onChange={(e)=>{ setSchemedata({... schemedata,payout_cycle:e.target.value})}} >
                                            <option>--Select--</option>
                                            <option value="annually">Annually</option>
											<option value="quarterly">Quarterly</option>
											<option value="monthly">Monthly</option>
        
                                        </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                        <Label for="created_by">Scheme Created By</Label>
                                        <Input id="created_by" name="created_by"  type="text" value={fullname} style={{backgroundColor:"#f1f1f3"}}
                                         readOnly/> 
                                </FormGroup>
                            </Col>
                         
                        </Row>
                        
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                        <Label>Country</Label>
                                        <Input id="country" name="country" type="select"
                                        onChange={(e)=>{ setSchemedata({... schemedata,country:e.target.value})}}>
                                        {
                                          country.map((year) => (
                                           
                                              <option key={year.country_name} value={year.country_name}>{year.country_name}</option>
                                        ))}

        
                                        </Input> 
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label>Region</Label>
                                        <Input id="region" name="region" type="select" 
                                        onChange={state_sel}>
                                            <option>--Select--</option>
											<option value="CR">Central Region</option>
											<option value="NR">North Region</option>
											<option value="WS">West Region</option>
											<option value="ES">East Region</option>
											<option value="SO">South Region</option>
        
                                        </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label>Eligibility To</Label>
                                        <Input id="elgibl_to" name="elgibl_to" type="select"
                                        onChange={(e)=>{ setSchemedata({... schemedata,elgibl_to:e.target.value})}}>
                                            <option>--select--</option>
                                            <option value="Primary Sales">Primary Sales</option>
											<option value="Secondary Sales">Secondary Sales</option>
        
                                        </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label>Scheme Created On</Label>
                                        <Input id="created_on" name="created_on"  type="text" value={created_on} style={{backgroundColor:"#f1f1f3"}}
                                         readOnly/> 
                                </FormGroup>
                            </Col>
                         
                        </Row>

                        <Row>
                        <Col md={3}>
                                <FormGroup>
                                        <Label>Based On</Label>
                                        <Input id="based_on" name="based_on" type="select"
                                        onChange={(e)=>{ setSchemedata({... schemedata,based_on:e.target.value})}}>
                                            <option>--Select--</option>
                                            {/* <option value="No. of Accounts">No. of Accounts</option> */}
											<option value="Revenue">Revenue</option>
											<option value="CTC">CTC</option>
        
                                        </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                        <Label>Types Of Accounts</Label>
                                        
                                        <Input id="typeofac" name="typeofac"  type="text" value={"% Of "+schemedata.based_on} style={{backgroundColor:"#f1f1f3"}}
                                        onChange={(e)=>{ setSchemedata({... schemedata,typeofac:"% Of "+schemedata.based_on})}}/> 
                                </FormGroup>
                            </Col>
                         
                        
                        </Row>

                        <div id="rooty">
                         <Button className="bg-primary" onClick={handleAddRow} style={{border:"none",marginTop:20}}>Add Row</Button>
                          </div>
                          <Table bordered hover striped className="table" id="dynamic-table" style={{marginTop:14}}> 
                          {visible &&    
                            <thead>
                                <tr>
                                <th >SR No</th>
                                <th>Scheme Id</th>
                                <th>Incentive To</th>
                                <th>Based On</th>
                                <th>Types of Account</th>
                                <th>action</th>
                                </tr>
                            </thead>
                            } 
                                 
                            <tbody id="dynamic-body">
                            {
                             
                            tdar.map((lk,index)=>{
                                 
                                            return  lk.id !==100 ? <tr key={index}>
                                             
                                            <td>{index+1}</td>
                                            <td>{lk.scheme_id}</td>
                                            <td>{lk.elgibl_to}</td>
                                            <td>{lk.based_on}</td>
                                            <td>{lk.typeofac}</td>
                                            <td><Button onClick={e => handleDelete(index,e)}>Delete</Button></td>
                                            
                                          </tr>
                                          
                                  :
                                       console.log("hi");
                                          },[])
                                       

                                        
                                        }  
    
                            </tbody>
                        </Table>

                        <Row style={{marginTop:30}}>
                            <Col md={4}>
                                <FormGroup>
                                        <Label for="exampleSelectMulti" style={{marginLeft:105}}>Available State</Label>
                                        <Button className="bg-primary" onClick={addall}  style={{marginLeft:35,width:246,marginBottom:10,border:"none",marginTop:12}} id="addall">Add All</Button>

                                        <Input id="region" name="region" type="select"
                                         onChange={(e) =>{setdepots(e); console.log(e.target.value)}}>
                                            
                                            <option label={"--select--"} value={"--select--"}>{"--select--"}</option>
                                            {
                                              region.map((year) => (
                                                  <option label={year.name} value={year.name}>{year.name}</option>
                                              ))
                                            }

        
                                        </Input>
                                       
  
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                        <Label for="exampleSelectMulti" style={{marginLeft:99}}>Selected State</Label>
                                        <Button className="bg-primary" style={{marginLeft:26,width:246,marginBottom:10,border:"none",marginTop:12}} id="removeall" onClick={removeall}>Remove All</Button>
                                        <Multiselect options={foption_2} selectedValues={foption_2} onSelect={on_state_sel} onRemove={onRemove} displayValue="name"/>                                     
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                        <Label for="exampleSelectMulti" style={{marginLeft:100}}>Selected City</Label>
                                        <Button className="bg-primary" style={{marginLeft:26,width:246,marginBottom:10,border:"none",marginTop:12}} id="ankita">Available City</Button>
                                        <Multiselect options={selected_2} selectedValues={selected_2} onSelect={city_select} onRemove={onRemove_city} displayValue="name" />                                                                             
                                </FormGroup>
                            </Col>
                         
                        </Row>

                        <Row style={{marginTop:30}}>
                            <Col md={6}>
                                <FormGroup>
                                        <Label for="exampleSelectMulti">Upload Scheme Document</Label>
                                        <div style={{width:"100%",height:45,border:"1px solid #ccc"}}>
                                             <input type="file" style={{marginLeft:10,marginTop:7}} id="doc_file" name="doc_file"
                                            onChange={(e)=>{ setSchemedata({... schemedata,doc_file:e.target.files[0]})}}/>  
                                        </div>
                                        <Label for="exampleSelectMulti" style={{marginTop:10}}>Scheme Document Comment</Label>
                                        <div style={{width:"100%",height:45}}>
                                        <Input id="scheme_document_comment" name="scheme_document_comment" type="textarea"
                                         onChange={(e)=>{ setSchemedata({... schemedata,scheme_document_comment:e.target.value})}}
                                        /> 
                                        </div>
                                          
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                        <Label for="exampleSelectMulti">Upload Other Document</Label>
                                        <div style={{width:"100%",height:45,border:"1px solid #ccc"}}>
                                        <input type="file" style={{marginLeft:10,marginTop:7}} id="doc_file1" name="doc_file1"
                                        onChange={(e)=>{ setSchemedata({... schemedata,doc_file1:e.target.files[0]})}}
                                        /> 
                                        {/* onChange={(e)=>{ setSchemedata({... schemedata,doc_file1:e.target.value})}} */}
                                        </div>
                                        <Label for="exampleSelectMulti" style={{marginTop:10}}>Scheme Document Comment</Label>
                                        <div style={{width:"100%",height:45}}>
                                        <Input id="other_document_comment" name="other_document_comment" type="textarea"
                                        onChange={(e)=>{ setSchemedata({... schemedata,other_document_comment:e.target.value})}}
                                        /> 
                                        </div>  
                                </FormGroup>
                            </Col>
                         
                        </Row>
                        
        <Row>
            <Col md={12}>
                <FormGroup className=" mx-1">
                    <Label>Remarks</Label>
                    <Input id="textareaAutosize" name="textareaAutosize" type="textarea"
                    onChange={(e)=>{ setSchemedata({... schemedata,textareaAutosize:e.target.value})}}/>
                </FormGroup>
            </Col>
        </Row> 
        <Spinner color="primary" id="spinner" style={{marginTop:10,marginBottom:17,marginLeft:502,display:"none"}}>Loading...</Spinner>
        <Button className="bg-primary" type="button" onClick={onFileChangeHandler} style={{border:"none",marginLeft:472,width:92}}>Save</Button>
    </Form>
                
</CardBody>
</Card> 
</Form>
</Col>
<Form/>
</Row>       
</div>
)}
export default Createscheme;