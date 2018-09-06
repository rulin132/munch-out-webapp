import React from "react";
import { Container, Row, Col, Navbar, Button, Jumbotron, NavbarBrand, NavbarToggler, Collapse, Form, FormGroup, Alert } from 'reactstrap';
import "./sign-in.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
const LogInView = ({ onSubmit }) => {
  return (
<Container>
      <Col md="6" mx="auto" className="text-center">
         <div className="header-title">
            <h1 className="wv-heading--title">
               SIGN IN
            </h1>
            <p>or <a href="/signup">create an account</a></p>
               
      
         </div>
      </Col>
      <Row>
         <Col md="4" mx="auto">
            <div className="myform form ">
               <Form onSubmit={onSubmit}>
                  <FormGroup>
                     <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                      <input type="password" name="password"  className="form-control my-input" id="password" placeholder="Password" />
                   </FormGroup>
                  <div className="text-center ">
                     <button type="submit" className=" btn btn-block btn-primary send-button tx-tfm">Sign in</button>
                  </div>
                  <div className="col-md-12 ">
                     <div className="login-or">
                        <hr className="hr-or" />
            
                        <span className="span-or">or</span>
                     </div>
                  </div>
                  <FormGroup>
                    
                     <Button block href="#">
                     <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
                     </Button>
                  </FormGroup>
                  <p className=" mt-3"><a href="/passwordreset">Forgotten Password</a>.
                  </p>
               </Form>
            </div>
     
      </Col>
    </Row>
   </Container>
  );
};

export default LogInView;