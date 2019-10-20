import React, { Component } from 'react'
import { connect} from 'react-redux'
import { sendPasswordResetEmail } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';

class ForgotPassword extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        const { email } = e.target.elements;
        this.props.sendPasswordResetEmail(email);
    }

  render() {
      const { auth } = this.props;

      if (auth.uid) {
            return <Redirect to='/' />
      }

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
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Email" />
                </FormGroup>
                
                <div className="text-center ">
                    <button type="submit" className=" btn btn-block btn-primary send-button tx-tfm">Reset Password</button>
                </div>
              </Form>
            </div>
      </Col>
    </Row>
   </Container>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapdispatchToProps = (dispatch) => {
    return {
        signIn: (email) => dispatch(sendPasswordResetEmail(email))
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ForgotPassword)
