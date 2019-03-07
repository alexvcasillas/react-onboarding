import React from 'react';

class Fieldset extends React.Component {
  render() {
    const { children } = this.props;
    return children || null;
  }
}

Fieldset.propTypes = {};

export default Fieldset;
