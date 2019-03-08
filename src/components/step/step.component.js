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
    const stepContents = children({ nextStep, prevStep });
    // Here we check if we have multiple childs for this step or a single one
    if (Array.isArray(stepContents.props.children)) {
      // Children comes in the flavor of array so we have to map over to
      // enhance any of those who's a Field
      return {
        ...stepContents,
        props: {
          children: stepContents.props.children.map(child => {
            return enhanceField(child, {
              step: snakeCase(stepName),
            });
          }),
        },
      };
    } else {
      // Children comes in the flavor or an object so we don't have to
      // map over and just enhace the children in case it's a Field
      return {
        ...stepContents,
        props: {
          children: enhanceField(stepContents.props.children, { step: snakeCase(stepName) }),
        },
      };
    }
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
