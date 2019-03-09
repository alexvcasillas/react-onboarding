import React from 'react';
import PropTypes from 'prop-types';
import { OnboardingService } from '../../core/services/core.service';
import { snakeCase } from '../../core/utils';

class Field extends React.Component {
  constructor(props) {
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
          const onChangeValidation = validations.find(validation => validation.on === 'change');
          if (onChangeValidation) {
            const {
              __enhancements: { setValidStep },
            } = this.props;
            const validationOk = onChangeValidation.validator(value);
            if (!validationOk) this.setState({ valid: false, error: onChangeValidation.errorMessage });
            setValidStep(validationOk);
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
          const onFocusValidation = validations.find(validation => validation.on === 'focus');
          if (onFocusValidation) {
            const {
              __enhancements: { setValidStep },
            } = this.props;
            const validationOk = onFocusValidation.validator(value);
            if (!validationOk) this.setState({ valid: false, error: onFocusValidation.errorMessage });
            setValidStep(validationOk);
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
          const onBlurValidation = validations.find(validation => validation.on === 'blur');
          if (onBlurValidation) {
            const {
              __enhancements: { setValidStep },
            } = this.props;
            const validationOk = onBlurValidation.validator(value);
            console.log({ validationOk });
            if (!validationOk) this.setState({ valid: false, error: onBlurValidation.errorMessage });
            setValidStep(validationOk);
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

Field.propTypes = {
  title: PropTypes.string,
  validations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      validator: PropTypes.func,
      on: PropTypes.oneOf(['change', 'blur', 'focus']),
      errorMessage: PropTypes.string,
    }),
  ),
};

export default Field;
