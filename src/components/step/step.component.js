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
    /**
     * NOTE
     * There's a special step type: the conversational step
     * This field is ment to be a source of feedback to the user
     * meaning that, it won't have any fields or validations so,
     * this step should be processed and valid by default.
     */
    const conversational = props.conversational;
    this.state = { validStep: true, processed: conversational ? true : false };
  }

  setValidStep = isValid => this.setState({ validStep: isValid });
  setProcessed = processed => this.setState({ processed });

  stepRenderer = () => {
    const {
      children,
      name: stepName,
      __enhancements: { nextStep, prevStep },
    } = this.props;
    const { validStep, processed } = this.state;
    /**
     * NOTE
     * If the status of this form is invalid (!validStep), the
     * next step function is setted to an empty function that
     * returns null to prevent the user to move to next step
     */
    const stepContents = children({ nextStep: processed ? nextStep : () => null, prevStep, validStep });
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
              setValidStep: this.setValidStep,
              setProcessed: this.setProcessed,
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
          children: enhanceField(stepContents.props.children, {
            step: snakeCase(stepName),
            setValidStep: this.setValidStep,
            setProcessed: this.setProcessed,
          }),
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
