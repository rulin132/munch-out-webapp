import React, { Component } from "react";
import {Input} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class Method extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.props.removeItem.bind(this);
    this.onChange = this.props.onChange.bind(this);
  }

    render() {
      const {item} = this.props;

      return  <div>
      <h4>Step {this.props.num}<span className="float-right button-group"><a className="pull-right" onClick={ this.props.removeItem }
                 style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
             <FontAwesomeIcon icon={faTimesCircle} />
             </a></span></h4>
             <p><Input type="textarea" onChange={this.props.onChange} value={ item.text } /></p> 
     </div>;
    }
}

export default Method;
