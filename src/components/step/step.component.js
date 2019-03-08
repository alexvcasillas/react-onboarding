import React from 'react';
import PropTypes from 'prop-types';
import { enhanceField } from '../../core/index.core';
import { OnboardingService } from '../../core/services/core.service';
import { snakeCase } from '../../core/utils';

class Step extends React.Component {
  constructor(props) {
    super(props);
    const snaked_name = snakeCase(props.name);
    OnboardingService.setStep(snaked_name);
  }

  stepRenderer = () => {
    const {
      children,
      name: stepName,
      __enhancements: { nextStep, prevStep },
    } = this.props;
    const prerenderedChildren = children({ nextStep, prevStep }).props.children;
    return prerenderedChildren.map(child => {
      return enhanceField(child, {
        step: snakeCase(stepName),
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
    prevStep: PropTypes.func.isRequired,
  }),
};

export default Step;
