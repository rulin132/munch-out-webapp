import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
const SignUpView = ({ onSubmit }) => {
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
             <form onSubmit={onSubmit} name="login">
                <div className="form-group">
                   <input type="text" name="name"  className="form-control my-input" id="name" placeholder="Name" />
                </div>
                <div className="form-group">
                   <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" name="password"  className="form-control my-input" id="password" placeholder="Password" />
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
                   <a className="btn btn-block f-button" href="#">
                   <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
                   </a>
                </div>
             </form>
          </div>
       </div>
    </div>
 </div>
  );
};

export default SignUpView;