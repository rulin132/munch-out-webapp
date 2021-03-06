import React from 'react'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import '../../assets/styles/App.css';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import {withRouter} from 'react-router-dom';
const NavigationBar = (props) => {
    const { auth, mainNav, landingView, className } = props;

    if (mainNav && props.location.pathname === '/') {
        return <div></div>;
    }    

    const authLinks = auth.uid ? <SignedInLinks /> :
        <SignedOutLinks />;

    const classNameOut  = (landingView ? 'fixed-top' : '') + ' ' + className; 


    return (
        <Navbar color="dark" dark  expand="lg" className={classNameOut}>
            <NavbarBrand href="/">Munch Out</NavbarBrand>
            <NavbarToggler  />
          
            {authLinks}
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(withRouter(NavigationBar));