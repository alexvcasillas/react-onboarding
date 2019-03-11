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
    console.log(this.numberOfSteps);
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
    const elements = React.Children.map(children, (child: JSX.Element, i: number) => {
      // Somehow, there could be childs that are null
      // Maybe related to {onboardingComplete && (<component></component>)} expressions
      // We have to skip those null child since we don't want to render them
      if (!child) return;
      const type = child.type.__type;
      if (!type) return child;
      if (!finished && type === END_TYPE_KEY) return;
      if (!finished && type !== END_TYPE_KEY && type !== STEP_TYPE_KEY) return child;
      if (!finished && type === STEP_TYPE_KEY) {
        if (encounteredStep === currentStep && !stepFound) {
          stepFound = true;
          return enhanceStep(child, {
            nextStep: this.nextStep,
            prevStep: this.prevStep,
          });
        }
        encounteredStep = encounteredStep + 1;
        return;
      }
      if (finished && type !== STEP_TYPE_KEY) return child;
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
        }}
      >
        {this.onboardingRenderer()}
      </Provider>
    );
  }
}

export { Onboarding, Consumer as Info };
