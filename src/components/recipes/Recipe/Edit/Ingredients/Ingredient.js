import React, { Component } from "react";
import { ListGroupItem, Input } from 'reactstrap';

class Ingredient extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.props.removeItem.bind(this);
    this.onChange = this.props.onChange.bind(this);
  }

    render() {
      const {item} = this.props;

      return (
        <ListGroupItem className="d-flex  justify-content-center">
          <Input type="text" value={ item.text } className="p-2" onChange={this.props.onChange} />
          <button type="button" className="close ml-3" aria-label="Close"  onClick={ this.props.removeItem }>
            <span aria-hidden="true">&times;</span>
          </button>
        </ListGroupItem>
      );
    }
}

export default Ingredient;