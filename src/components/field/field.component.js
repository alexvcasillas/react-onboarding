import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.Component {
  render() {
    const { children } = this.props;
    return children || null;
  }
}

Field.propTypes = {
  title: PropTypes.string,
};

export default Field;
