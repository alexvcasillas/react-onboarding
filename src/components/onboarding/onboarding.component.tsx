import React from 'react';

import { OnboardingService } from '../../core/services/core.service';

import { enhanceStep, calculateNumberOfSteps } from '../../core/index.core';
import { STEP_TYPE_KEY, END_TYPE_KEY } from '../../core/constants';

const { Provider, Consumer } = React.createContext({});

type Props = {
  initialStep: number;
  finished: boolean;
  children: JSX.Element[] | JSX.Element;
};
type State = {
  initialStep: number;
  currentStep: number;
};

class Onboarding extends React.Component<Props, State> {
  numberOfSteps: number;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      initialStep: props.initialStep || 0,
      currentStep: props.initialStep || 0,
    };
    this.numberOfSteps = calculateNumberOfSteps(props.children);
  }

  nextStep = (): void => {
    const { currentStep } = this.state;
    // Check if we want to move beyond the last step
    if (currentStep + 1 >= this.numberOfSteps) return;
    this.setState(prevState => ({
      ...prevState,
      currentStep: prevState.currentStep + 1,
    }));
  };

  prevStep = (): void => {
    const { currentStep } = this.state;
    // Check if we want to move beyond the first step
    if (currentStep - 1 < 0) return;
    this.setState(prevState => ({
      ...prevState,
      currentStep: prevState.currentStep - 1,
    }));
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { currentStep } = this.state;
    const { finished } = this.props;
    return currentStep !== nextState.currentStep || finished !== nextProps.finished;
  }

  onboardingRenderer = (): JSX.Element | JSX.Element[] => {
    const { children, finished } = this.props;
    const { currentStep } = this.state;
    let encounteredStep = 0;
    let stepFound = false;
    if (Array.isArray(children)) {
      const extendedChildrens: JSX.Element[] = children
        .filter((child: JSX.Element) => {
          // Is this child not an object (React Component | DOM Element) type? We don't want it then
          // This is due to certain stuff like: {!onboardingComplete && <header>Onboarding process</header>}
          // The described code above will make the children be literally false when !onboardingComplete
          // This way we can skip trying to render a false value
          if (typeof child !== 'object') return false;
          // Is the form not finished and we're trying to render the end component?
          if (!finished && child.type.name === END_TYPE_KEY) return false;
          // Is the form not finished and we're trying to render anything but a step or and end component?
          if (!finished && child.type.name !== END_TYPE_KEY && child.type.name !== STEP_TYPE_KEY) return true;
          // Is the form not finished and we're trying to render a step?
          if (!finished && child.type.name === STEP_TYPE_KEY) {
            // Is this the step we would like to render?
            if (encounteredStep === currentStep && !stepFound) {
              // Yes, this is the step we would like to render
              stepFound = true; // Raise the flag
              return true; // Return this step
            }
            // If it's not, increase the counter to check for next step
            encounteredStep = encounteredStep + 1;
            // Do not return this component
            return false;
          }
          // Is the form finished and we're trying to render anything but a step?
          if (finished && child.type.name !== STEP_TYPE_KEY) return true;
        })
        .map((child: JSX.Element) => {
          if (child.type.name !== STEP_TYPE_KEY) return child;
          // Enhance the step with the nextStep & prevStep functions
          return enhanceStep(child, {
            nextStep: this.nextStep,
            prevStep: this.prevStep,
          });
        });
      return extendedChildrens;
    }
    // Check if it's not a step and return it
    if (children.type.name !== STEP_TYPE_KEY) return children;
    // Return the enhanced step
    return enhanceStep(children, {
      nextStep: this.nextStep,
      prevStep: this.prevStep,
    });
  };

  render() {
    const { currentStep } = this.state;
    return (
      <Provider
        value={{
          numberOfSteps: this.numberOfSteps,
          currentStep: currentStep + 1,
          onboarding: OnboardingService.tree,
          prevStep: this.prevStep,
          nextStep: this.nextStep,
        }}
      >
        {this.onboardingRenderer()}
      </Provider>
    );
  }
}

export { Onboarding, Consumer as Info };
