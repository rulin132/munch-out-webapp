import React, { Component } from 'react'
import { connect} from 'react-redux'
import { signIn, signInWithGoogle } from '../../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import "./sign-in.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

class SignIn extends Component {
    state = {
        email: null,
        password: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleGoogleSignInClick = () => {
      this.props.signInWithGoogle();
    }

   render() {
      const { authError, auth } = this.props;

      if (auth.uid) {
            return <Redirect to='/' />
      }

      return (
      <Container className="login-container">
         <Col md="6" mx="auto" className="text-center col-centered">
            
            <div className="header-title">
               <h1 className="wv-heading--title">
                  SIGN IN
               </h1>
               <p>or <a href="/signup">create an account</a></p>
            </div>
         </Col>
         <Row>
            <Col md="4" mx="auto" className="col-centered">
               <div className="myform form ">
                  <Form onSubmit={this.handleSubmit}>
                     <FormGroup>
                        <input 
                           type="email" 
                           name="email"  
                           className="form-control my-input" 
                           id="email" 
                           placeholder="Email" 
                           onChange={this.handleChange} />
                     </FormGroup>
                     <FormGroup>
                        <input 
                           type="password" 
                           name="password"  
                           className="form-control my-input" 
                           id="password" 
                           placeholder="Password" 
                           onChange={this.handleChange} />
                     </FormGroup>
                     <div className="text-center ">
                        <button 
                           type="submit" 
                           className="btn btn-block btn-primary send-button tx-tfm">
                              Sign in
                        </button>
                     </div>
                     <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                           {authError ? <p>{authError}</p> : null }
                        </div>
                     </div>
                     <div className="col-md-12 ">
                        <div className="login-or">
                           <hr className="hr-or" />

                           <span className="span-or">or</span>
                        </div>
                     </div>
                     <FormGroup>
                        <Button block onClick={this.handleGoogleSignInClick}>
                           <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
                        </Button>
                     </FormGroup>
                     <p className=" mt-3">
                        <a href="/passwordreset">Forgotten Password</a>.
                     </p>
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapdispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        signInWithGoogle: () => dispatch(signInWithGoogle())
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(SignIn)
