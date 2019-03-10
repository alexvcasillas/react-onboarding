import React from 'react';
import { OnboardingService } from '../../core/services/core.service';
import { snakeCase } from '../../core/utils';
import { FieldEnhancements } from '../../core/index.core';

type Validation = {
  name: string;
  on: string;
  validator: Function;
  errorMessage: string;
};

type Props = {
  __enhancements: FieldEnhancements;
  validations: Validation[];
  name: string;
  type: string;
  children: (props: any) => JSX.Element;
};

type State = {
  value: string;
  valid: boolean;
  error: string;
};

class Field extends React.Component<Props, State> {
  step: string;
  snaked_name: string;
  constructor(props: Props) {
    super(props);
    // Get Step name from enhancements
    const {
      __enhancements: { step },
    } = this.props;
    // Snake case the name and set it
    this.snaked_name = snakeCase(props.name);
    // Set the step for further use
    this.step = step;
    // Set this field within the onboarding service
    OnboardingService.setField(this.snaked_name, step);
    this.state = {
      value: OnboardingService.getFieldValue(this.snaked_name, step),
      valid: true,
      error: null,
    };
  }

  onChange = value => {
    // First we asume the field status is valid
    this.setState(
      () => ({ valid: true, error: null }),
      () => {
        // Set that this field had some input
        const {
          __enhancements: { setProcessed },
        } = this.props;
        // Field has to be setted anyway
        OnboardingService.setFieldValue(this.snaked_name, this.step, value);
        this.setState({ value: value });
        const { validations = [] } = this.props;
        // Check if this field has validations
        if (validations.length !== 0) {
          const onChangeValidations = validations.filter(validation => validation.on === 'change');
          if (onChangeValidations) {
            /**
             * NOTE
             * We would like to stop running validations of we
             * already have a validation that has failed
             * that's why we're using a for-loop instead of a forEach.
             */
            let alreadyErrored = false;
            for (let i = 0; i < onChangeValidations.length && !alreadyErrored; i++) {
              const {
                __enhancements: { setValidStep },
              } = this.props;
              const validationOk = onChangeValidations[i].validator(value);
              if (!validationOk) {
                this.setState({ valid: false, error: onChangeValidations[i].errorMessage });
                // Raise the flag so we stop running the loop
                alreadyErrored = true;
              }
              setValidStep(validationOk);
            }
          }
        }
        setProcessed(true);
      },
    );
  };

  onFocus = () => {
    // First we asume the field status is valid
    this.setState(
      () => ({ valid: true, error: null }),
      () => {
        const { value } = this.state;
        const { validations = [] } = this.props;
        // Check if this field has validations
        if (validations.length !== 0) {
          const onFocusValidations = validations.filter(validation => validation.on === 'focus');
          if (onFocusValidations) {
            /**
             * NOTE
             * We would like to stop running validations of we
             * already have a validation that has failed
             * that's why we're using a for-loop instead of a forEach.
             */
            let alreadyErrored = false;
            for (let i = 0; i < onFocusValidations.length && !alreadyErrored; i++) {
              const {
                __enhancements: { setValidStep },
              } = this.props;
              const validationOk = onFocusValidations[i].validator(value);
              if (!validationOk) {
                this.setState({ valid: false, error: onFocusValidations[i].errorMessage });
                // Raise the flag so we stop running the loop
                alreadyErrored = true;
              }
              setValidStep(validationOk);
            }
          }
        }
      },
    );
  };

  onBlur = () => {
    // First we asume that field status is valid
    this.setState(
      () => ({ valid: true, error: null }),
      () => {
        const { value } = this.state;
        const { validations = [] } = this.props;
        // Check if this field has validations
        if (validations.length !== 0) {
          const onBlurValidations = validations.filter(validation => validation.on === 'blur');
          if (onBlurValidations) {
            /**
             * NOTE
             * We would like to stop running validations of we
             * already have a validation that has failed
             * that's why we're using a for-loop instead of a forEach.
             */
            let alreadyErrored = false;
            for (let i = 0; i < onBlurValidations.length && !alreadyErrored; i++) {
              const {
                __enhancements: { setValidStep },
              } = this.props;
              const validationOk = onBlurValidations[i].validator(value);
              if (!validationOk) {
                this.setState({ valid: false, error: onBlurValidations[i].errorMessage });
                // Raise the flag so we stop running the loop
                alreadyErrored = true;
              }
              setValidStep(validationOk);
            }
          }
        }
      },
    );
  };

  render() {
    const { children, type } = this.props;
    const { value, error, valid } = this.state;
    return children({
      value,
      type,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      error: error,
      valid,
    });
  }
}

export default Field;
