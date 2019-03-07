import React from 'react';
import PropTypes from 'prop-types';

import { stepsFromTree, enhanceStep, calculateNumberOfSteps } from '../../core/index.core';
import { STEP_TYPE_KEY } from '../../core/constants';

const { Provider, Consumer } = React.createContext();

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialStep: props.initialStep || 0,
      currentStep: props.initialStep || 0,
    };
    this.numberOfSteps = calculateNumberOfSteps(props.children);
  }

  onOnboardingComplete = () => {
    const { onOnboardingComplete } = this.props;
    onOnboardingComplete();
  };

  nextStep = () => {
    const { currentStep } = this.state;
    // Check if we want to move beyond the last step
    if (currentStep + 1 >= this.numberOfSteps) return;
    this.setState(prevState => ({
      ...prevState,
      currentStep: prevState.currentStep + 1,
    }));
  };

  onboardingRenderer = () => {
    const { children } = this.props;
    const { currentStep } = this.state;
    let encounteredStep = 0;
    let stepFound = false;
    const extendedChildrens = children
      .filter(child => {
        // It's not child type, return it immediately
        if (child.type.name !== STEP_TYPE_KEY) return true;
        // Is this the step we're looking for?
        if (encounteredStep === currentStep && !stepFound) {
          stepFound = true;
          return true;
        }
        encounteredStep = encounteredStep + 1;
        return false;
      })
      .map(child => {
        return enhanceStep(child, {
          nextStep: this.nextStep,
        });
      });
    return extendedChildrens;
  };

  render() {
    const { currentStep } = this.state;
    return (
      <Provider value={{ numberOfSteps: this.numberOfSteps, currentStep: currentStep + 1 }}>
        {this.onboardingRenderer()}
      </Provider>
    );
  }
}

Onboarding.propTypes = {
  initialStep: PropTypes.number,
};

export { Onboarding, Consumer as Info };

// export default Onboarding;
