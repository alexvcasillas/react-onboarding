import * as React from 'react';
import { enhanceField, StepEnhancements } from '../../core/index.core';
import { OnboardingService } from '../../core/services/core.service';
import { snakeCase } from '../../core/utils';
import { STEP_TYPE_KEY } from '../../core/constants';

type Props = {
  name: string;
  conversational: boolean;
  children: (props: StepEnhancements) => JSX.Element;
  __enhancements: StepEnhancements;
};
type State = {
  validStep: boolean;
  processed: boolean;
};

class Step extends React.Component<Props, State> {
  step: string;
  constructor(props: Readonly<Props>) {
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
    const conversational: boolean = props.conversational;
    this.state = { validStep: false, processed: conversational ? true : false };
  }

  setValidStep = (isValid: boolean): void => this.setState({ validStep: isValid });
  setProcessed = (processed: boolean): void => this.setState({ processed });

  componentDidMount() {
    /**
     * NOTE
     * To be able to have optional steps
     * we have to check if some of the children have validations attached
     * this way. A step, by default has an unprocessed state (!processed)
     * meaning that the user have to provide some input. By checking if
     * the child have validations we could declare this step as processed beforehand
     * so we can click next without having to provide any input
     */
    const {
      props: { children: stepContents },
    } = this.props.children({ nextStep: () => {}, prevStep: () => {}, validStep: true });
    const someHaveValidations = stepContents.some((child: JSX.Element) => child.props.validations);
    if (someHaveValidations) return;
    this.setState({ validStep: true, processed: true });
  }

  stepRenderer = (): JSX.Element => {
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
    const stepContents = children({
      nextStep: processed ? nextStep : () => null,
      prevStep: prevStep ? prevStep : () => null,
      validStep: validStep && processed ? true : false,
    });
    // Here we check if we have multiple childs for this step or a single one
    if (Array.isArray(stepContents.props.children)) {
      // Children comes in the flavor of array so we have to map over to
      // enhance any of those who's a Field
      return {
        ...stepContents,
        props: {
          children: stepContents.props.children.map((child: JSX.Element) => {
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

// @ts-ignore
Step.__type = STEP_TYPE_KEY;

export default Step;
