import React, { Component } from "react";
import {Input} from 'reactstrap';

class Method extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.props.removeItem.bind(this);
    this.onChange = this.props.onChange.bind(this);
  }

    render() {
      const {item} = this.props;

      return  <div>
      <h4>Step {this.props.num}
      <button type="button" className="close ml-3 pull-right" aria-label="Close"  onClick={ this.props.removeItem }>
            <span aria-hidden="true">&times;</span>
          </button>
      </h4>
             <p><Input type="textarea" onChange={this.props.onChange} value={ item.text } /></p> 
     </div>;
    }
}

export default Method;
