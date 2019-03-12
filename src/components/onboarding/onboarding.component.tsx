import * as React from 'react';

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
  finished: boolean;
};

class Onboarding extends React.Component<Props, State> {
  numberOfSteps: number;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      initialStep: props.initialStep || 0,
      currentStep: props.initialStep || 0,
      finished: false,
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

  finishForm = (): void => {
    this.setState({ finished: true });
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { currentStep, finished } = this.state;
    return currentStep !== nextState.currentStep || finished !== nextState.finished;
  }

  onboardingRenderer = (): JSX.Element | JSX.Element[] => {
    const { children } = this.props;
    const { currentStep, finished } = this.state;
    let encounteredStep = 0;
    let stepFound = false;
    let processedSteps = [];
    const elements = React.Children.map(children, (child: JSX.Element) => {
      // Somehow, there could be childs that are null
      // Maybe related to {onboardingComplete && (<component></component>)} expressions
      // We have to skip those null child since we don't want to render them
      if (!child) return;
      const type = child.type.__type;
      // Components that are not type STEP or END
      // didn't have a TYPE_KEY so we could have ended
      // with a end page with aditional unwanted components
      if (!finished && !type) return child;
      if (!finished && type === END_TYPE_KEY) return;
      if (!finished && type !== END_TYPE_KEY && type !== STEP_TYPE_KEY) return child;
      if (!finished && type === STEP_TYPE_KEY) {
        // Check to avoid duplicated step identifiers
        if (processedSteps.includes(child.props.name)) {
          throw new Error(`You have defined a duplicated step. ${child.props.name} step has already been defined.`);
        }
        processedSteps = [...processedSteps, child.props.name];
        if (encounteredStep === currentStep && !stepFound) {
          stepFound = true;
          return enhanceStep(child, {
            nextStep: this.nextStep,
            prevStep: this.prevStep,
            finish: this.finishForm,
          });
        }
        encounteredStep = encounteredStep + 1;
        return;
      }
      if (finished && type !== END_TYPE_KEY) return;
      if (finished && type === END_TYPE_KEY) return child;
    });
    return elements;
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
          finish: this.finishForm,
        }}
      >
        {this.onboardingRenderer()}
      </Provider>
    );
  }
}

export { Onboarding, Consumer as Info };
