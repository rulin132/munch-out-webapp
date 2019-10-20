import React from 'react'

import {  Button, Collapse, Form } from 'reactstrap';
const SignedOutLinks = () => {
    return (
        <Collapse navbar>
            <Form className="form-inline my-2 my-lg-0 ml-auto">
         
                <Button color="success" outline className="my-2 my-sm-0 mx-2"  href="/signup">
                    Sign Up
                </Button>
                <Button color="success" className="my-2 my-sm-0 mx-2 text-light" href="/login">
                Login
                </Button>
            </Form>
        </Collapse>
    )
}

export default SignedOutLinks;