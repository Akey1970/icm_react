import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Button,Label,Input,Row,Col,FormGroup,Form,Dropdown,FormText,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownItem}from "reactstrap";
    import { Link,useNavigate} from 'react-router-dom';
const Person=()=>{

  const navigate=useNavigate();
    return(
        <div className=" my-4  mx-4 bg-warning">
<h1>noioizs</h1>
<button onClick={()=>navigate("/")}>Home</button>
            <h1 className="text-center my-3  mx-3 bg-warning">Welcome shilpi in React Application</h1>
            
            <Form>
           
  <Row className="mx-4">
    <Col md={3}>
    <FormGroup>
    <Label for="exampleSelectMulti">
      Select Multiple
    </Label>
    <Input
      id="exampleSelectMulti"
      multiple
      name="selectMulti"
      type="select"
    >
      <option>
        1
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
    </Col>
    <Col md={3}>
    <FormGroup>
    <Label for="exampleDate">
      Date
    </Label>
    <Input
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
    />
  </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="exampleEmail" className=" mx-1 ">
          Email
        </Label>
        <Input
          id="exampleEmail"
          name="email"
          type="email"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="examplePassword">
          Password
        </Label>
        <Input
          id="examplePassword"
          name="password"
          type="password"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row className="mx-4 ">
    <Col md={3}>
    <FormGroup switch>
        <Input type="switch" role="switch" />
        <Label check>Default switch checkbox input</Label>
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="exampleState">
          State
        </Label>
        <Input
          id="exampleState"
          name="state"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="exampleZip">
          Zip
        </Label>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
<Col md={3}>
<Label for="exampleZip">
          Zip
        </Label>
<div className="d-flex p-7 justify-content-center" style={{marginLeft:-147}}>

  <UncontrolledDropdown
    className="me-2"
    direction="down"
  >
   
    <DropdownToggle
      caret
      style={{backgroundColor:"white",color:"black",width:277,marginLeft:152,border:"none"}}
    >
      Dropdown
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>
        Header
      </DropdownItem>
      <DropdownItem disabled>
        Action
      </DropdownItem>
      <DropdownItem>
        Another Action
      </DropdownItem>
      
      <DropdownItem>
        Another Action
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
  
</div>
</Col>
  

  </Row>
  <Row className="mx-2">
   <Col md={6}>
  <FormGroup className=" mx-3 ">
    <Label for="exampleText">
      Text Area
    </Label>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
    />
  </FormGroup>

  </Col>
 <Col md={3}>
 <Label
      for="exampleFile"
      sm={2}
    >
      File
    </Label>
 <FormGroup row>
 
    <Col sm={10}>
      <Input
        id="exampleFile"
        name="file"
        type="file"
      />
    
    </Col>
  </FormGroup>
 </Col>
 <Col>
  <FormGroup
    row
    tag="fieldset"
  >
    <legend className="col-form-label col-sm-2">
      Radio Buttons
    </legend>
    <Col sm={10}>
      <FormGroup check>
        <Input
          name="radio2"
          type="radio"
        />
        {' '}
        <Label check>
          Option one
        </Label>
      </FormGroup>
      <FormGroup check>
        <Input
          name="radio2"
          type="radio"
        />
        {' '}
        <Label check>
          Option two 
        </Label>
      </FormGroup>
     
    </Col>
  </FormGroup>
 </Col>
  <Col md={3} className='text-center' style={{marginLeft:522}}>
  
  <FormGroup check>
    <Input
      id="exampleCheck"
      name="check"
      type="checkbox"
      
    />
    <Label
      check
      for="exampleCheck"
      style={{marginLeft:-143}}
    >
      Check me out
    </Label>
  </FormGroup>
  </Col>  
  </Row>

  <Button  style={{marginTop:10,marginBottom:20,marginLeft:500}}>
    Sign in
  </Button>
  
</Form>
        </div>
    );
}

export default Person;