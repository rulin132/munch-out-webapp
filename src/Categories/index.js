import React, { Component } from "react";
import { Form, Input, Button, Container, ListGroup, InputGroup, InputGroupAddon } from 'reactstrap';
import { withRouter } from "react-router";

import firebase from "../base";
import Category from './Category';

import Navigation from '../Navigation';

const appTokenKey = "appToken";

class CategoriesContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            items: [],
            text: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.removeItem = this.removeItem.bind(this);

        const userId = localStorage.getItem(appTokenKey);

        this.firebaseRef = firebase.database().ref('users/' + userId + '/categories');
    }

    componentDidMount() {
        this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
            var items = [];
            this.setState({
                items: items,
                fetching: true
            });
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            
            this.setState({
                items: items
            });
        }.bind(this));
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }
    
    onChange(e) {
        this.setState({text: e.target.value});
    }
    
    removeItem(key) {
        this.firebaseRef.child(key).remove();
    }

    onColUpdate = (snapshot) => {
        const items = snapshot.items.map((docSnapshot) => ({
            id: docSnapshot.id,
            data: docSnapshot.data()
        }));
    
        this.setState({
            items: items,
            fetching: false
        });
    };
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRef.push({
                text: this.state.text
            });
            
            this.setState({
                text: ''
            });
        }
    }
    
    render() {
        const {items} = this.state;
        return (
            <div>
                <Navigation authenticated={this.props.authenticated} />
                <Container>
                    <div className="col-md-6 mx-auto text-center">
                        <div className="header-title">
                            <h1 className="wv-heading--title">
                                RECIPE CATEGORIES
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <ListGroup mt="3">
                            {items.map((item) => <Category key={item['.key']} item={item} removeItem={() => this.removeItem(item['.key']) }  />)}
                            
                            {/* <a href="#" class="list-group-item list-group-item-action">Beef</a>
                            <a href="#" class="list-group-item list-group-item-action">Fish</a>
                            <a href="#" class="list-group-item list-group-item-action">Pork</a>
                            <a href="#" class="list-group-item list-group-item-action">Vegetarian</a>
                            <a href="#" class="list-group-item list-group-item-action">Vegan</a>
                            <a href="#" class="list-group-item list-group-item-action">Desserts</a> */}
                            </ListGroup>
                            <Form onSubmit={ this.handleSubmit } className="mt-2">
                                <InputGroup>
                                <Input type="text" id="addCategory" onChange={ this.onChange } value={ this.state.text } />
                                    <InputGroupAddon addonType="append"><Button>Add</Button></InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withRouter(CategoriesContainer);
