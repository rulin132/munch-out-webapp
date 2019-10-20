import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp, signInWithGoogle } from '../../../store/actions/authActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

class SignUp extends Component {
    state = {
        email: null,
        password: null,
        firstName: null,
        lastName: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.signUp(this.state)
        
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
    const { auth } = this.props;

    if (auth.uid) {
          return <Redirect to='/' />
    }

    return (
     <div className="container">
    <div className="col-md-6 mx-auto text-center">
       <div className="header-title">
          <h1 className="wv-heading--title">
             SIGN UP
          </h1>
          <p>or <a href="/login">sign in to your account</a></p>
       </div>
    </div>
    <div className="row">
       <div className="col-md-4 mx-auto">
          <div className="myform form ">
             <form onSubmit={this.handleSubmit} name="login">
                <div className="form-group">
                   <input type="text" name="firstName"  className="form-control my-input" id="firstName" placeholder="First Name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                   <input type="text" name="lastName"  className="form-control my-input" id="lastName" placeholder="Last Name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                   <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" name="password"  className="form-control my-input" id="password" placeholder="Password" onChange={this.handleChange} />
                 </div>
                <div className="text-center ">
                   <button type="submit" className=" btn btn-block btn-primary send-button tx-tfm">Create Your Free Account</button>
                </div>
                <div className="col-md-12 ">
                   <div className="login-or">
                      <hr className="hr-or" />
                      <span className="span-or">or</span>
                   </div>
                </div>
                <div className="form-group">
                   <a className="btn btn-block f-button" href="/" onClick={this.handleGoogleSignInClick}>
                   <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
                   </a>
                </div>
             </form>
          </div>
       </div>
    </div>
 </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        signInWithGoogle: () => dispatch(signInWithGoogle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
