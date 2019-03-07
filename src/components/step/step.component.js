import React from 'react';
import PropTypes from 'prop-types';
import { enhanceField } from '../../core/index.core';

class Step extends React.Component {
  constructor(props) {
    super(props);
  }

  stepRenderer = () => {
    const {
      children,
      name: stepName,
      __enhancements: { nextStep },
    } = this.props;
    const prerenderedChildren = children({ nextStep }).props.children;
    return prerenderedChildren.map(child => {
      return enhanceField(child, {
        step: stepName.replace(/-/gi, '_'),
      });
    });
  };

  render() {
    return this.stepRenderer();
  }
}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  __enhancements: PropTypes.shape({
    nextStep: PropTypes.func.isRequired,
  }),
};

export default Step;
