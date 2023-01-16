import React, { useState, useRef } from 'react';
import { END_TYPE_KEY, STEP_TYPE_KEY } from '../../core/constants';
import { calculateNumberOfSteps, enhanceStep } from '../../core/index.core';
import { OnboardingContext } from '../../core/services/onboarding-context';

interface Props {
  initialStep: number;
  finished: boolean;
  children: JSX.Element | JSX.Element[];
}

interface State {
  initialStep: number;
  currentStep: number;
  finished: boolean;
}

export const Onboarding = ({ initialStep, finished, children }: Props) => {
  const [state, setState] = useState<State>({
    initialStep: initialStep || 0,
    currentStep: initialStep || 0,
    finished: false,
  });

  const numberOfSteps = useRef(calculateNumberOfSteps(children));

  const nextStep = () => {
    if (state.currentStep + 1 >= numberOfSteps.current) return;
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    if (state.currentStep - 1 < 0) return;
    setState((prev) => ({ ...prev, currentStep: state.currentStep - 1 }));
  };

  const finishForm = () => {
    setState((prev) => ({ ...prev, finished: true }));
  };

  let encounteredStep = 0;
  let stepFound = false;
  let processedSteps: JSX.Element[] = [];

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
    if (!finished && type !== END_TYPE_KEY && type !== STEP_TYPE_KEY)
      return child;
    if (!finished && type === STEP_TYPE_KEY) {
      // Check to avoid duplicated step identifiers
      if (processedSteps.includes(child.props.name)) {
        throw new Error(
          `You have defined a duplicated step. ${child.props.name} step has already been defined.`,
        );
      }
      processedSteps = [...processedSteps, child.props.name];
      if (encounteredStep === state.currentStep && !stepFound) {
        stepFound = true;
        return enhanceStep(child, {
          nextStep: nextStep,
          prevStep: prevStep,
          finish: finishForm,
        });
      }
      encounteredStep = encounteredStep + 1;
      return;
    }
    if (finished && type !== END_TYPE_KEY) return;
    if (finished && type === END_TYPE_KEY) return child;
  });

  return (
    <OnboardingContext.Provider
      value={{
        numberOfSteps: numberOfSteps.current,
        currentStep: state.currentStep + 1,
        prevStep: prevStep,
        nextStep: nextStep,
        finish: finishForm,
      }}
    >
      {elements}
    </OnboardingContext.Provider>
  );
};
