import React, { useState } from 'react';
import { useMount } from 'react-use';
import { FIELD_TYPE_KEY, STEP_TYPE_KEY } from '../../core/constants';
import { enhanceField, StepEnhancements } from '../../core/index.core';
import { OnboardingService } from '../../core/services/core.service';
import { snakeCase } from '../../core/utils';

interface Props {
  name: string;
  /**
   * There's a special step type: the conversational step
   * This field is ment to be a source of feedback to the user
   * meaning that, it won't have any fields or validations so,
   * this step should be processed and valid by default.
   */
  conversational: boolean;
  children: (props: StepEnhancements) => JSX.Element;
  __enhancements: StepEnhancements;
}

export const Step = ({
  name,
  conversational,
  children,
  __enhancements,
}: Props) => {
  const [valid, setValidStep] = useState(true);
  const [processed, setProcessed] = useState(conversational);

  const snakedName = snakeCase(name);
  const { finish, nextStep, prevStep, validStep } = __enhancements;

  useMount(() => {
    if (!conversational) {
      OnboardingService.setStep(snakedName);
    }
    /**
     * To be able to have optional steps
     * we have to check if some of the children have validations attached
     * this way. A step, by default has an unprocessed state (!processed)
     * meaning that the user have to provide some input. By checking if
     * the child have validations we could declare this step as processed beforehand
     * so we can click next without having to provide any input
     */
    const {
      props: { children: stepContents },
    } = children({
      nextStep: () => {},
      prevStep: () => {},
      finish: () => {},
      validStep: true,
    });

    const someHaveValidations = stepContents.some(
      (child: JSX.Element) => child.props.validations,
    );

    if (someHaveValidations) return;

    setProcessed(true);
  });

  const stepContents = children({
    nextStep: processed ? nextStep : () => null,
    prevStep: prevStep ? prevStep : () => null,
    finish: processed ? finish : () => null,
    validStep: validStep,
  });

  return {
    ...stepContents,
    props: {
      children: React.Children.map(
        stepContents.props.children,
        (child: JSX.Element) => {
          if (!child) return;
          const type = child.type.__type;
          if (type === FIELD_TYPE_KEY) {
            return enhanceField(child, {
              step: snakedName,
              setValidStep: setValidStep,
              setProcessed: setProcessed,
            });
          }
          return child;
        },
      ),
    },
  };
};

Step.__type = STEP_TYPE_KEY;
