import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ListGroupItem, Input } from 'reactstrap';
class Ingredient extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.props.removeItem.bind(this);
    this.onChange = this.props.onChange.bind(this);
  }

    render() {
      const {item} = this.props;

      return <ListGroupItem>
   <Input type="text" value={ item.text } onChange={this.props.onChange} /> <span className="float-right button-group">
   <a className="pull-right" onClick={ this.props.removeItem }
            style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faTimesCircle} />
        </a></span>
      
      
    </ListGroupItem>;
    }
}

export default Ingredient;