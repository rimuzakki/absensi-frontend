import React, { Component } from 'react';
import './Container.css';

class Container extends Component {
  render() {
    const { type, ...resProps } = this.props;
    let className = '';

    if (type === 'wide') {
      className = 'containerWide'
    } else if (type === 'small') {
      className = 'containerSmall'
    } else if (type === 'medium') {
      className = 'containerMedium'
    } else {
      className = 'container'
    }

    return (
      <div {...resProps} className={className}>
        {this.props.children}
      </div>
    )
  }
}

export default Container