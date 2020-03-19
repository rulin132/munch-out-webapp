import React from "react";
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import "./sign-in.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

jn 
const LogInView = ({ onSubmit, onGoogleButtonClick }) => {
  return (

<Container className="login-container">
   <Row>
      <Col md="12" mx="auto" className="text-center login-form">
      <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
         <div className="header-title">
            <h3>
               SIGN IN
            </h3>
            <p>or <a href="/signup">create an account</a></p>      
         </div>
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
                    
                     <Button block onClick={onGoogleButtonClick}>
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
