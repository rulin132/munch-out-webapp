import React, {Component} from "react";
import { Container, Row, Col, Navbar, Button, Jumbotron, NavbarBrand, NavbarToggler, Collapse, Form, FormGroup, Alert } from 'reactstrap';
import "./sign-in.css";

class ForgotPasswordView extends Component {
getForm() {
  if (this.props.hasPasswordSentRequest === true) {
    return <div>Password reset request heading to your inbox now.</div>
  } 

  return (
    <Form onSubmit={this.props.onSubmit}>
      <FormGroup>
          <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Email" />
      </FormGroup>
      
      <div className="text-center ">
          <button type="submit" className=" btn btn-block btn-primary send-button tx-tfm">Reset Password</button>
      </div>
    </Form>
  );
}
render() {
  const form = this.getForm();
 



  return (
<Container>
      <Col md="6" mx="auto" className="text-center">
         <div className="header-title">
            <h1 className="wv-heading--title">
               FORGOTTEN PASSWORD REQUEST
            </h1>
            <p>or <a href="/login">Sign into account</a></p>
               
      
         </div>
      </Col>
      <Row>
         <Col md="4" mx="auto">
            <div className="myform form ">
              {form}
            </div>
     
      </Col>
    </Row>
   </Container>
  );
}

}

export default ForgotPasswordView;
