import React from 'react'

import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
const SignedInLinks = (props) => {
    const initials = props.profile.initials;
    
    return (
          <Nav className="ml-auto" navbar>
                <NavItem><NavLink href="/categories/">Categories</NavLink></NavItem>
                <NavItem><NavLink href="/recipes/">Recipes</NavLink></NavItem>
                <li><Button href="signout" onClick={props.signOut}>Log Out</Button></li>
                <li><NavLink to="/" className="btn btn-floating pink lighten-1">{initials}</NavLink></li>
            </Nav>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);