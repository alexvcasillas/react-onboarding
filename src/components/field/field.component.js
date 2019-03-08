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
      type: props.type,
      value: OnboardingService.getFieldValue(this.snaked_name, step),
    };
  }

  onChange = e => {
    OnboardingService.setFieldValue(this.snaked_name, this.step, e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    const { children } = this.props;
    const { type, value } = this.state;
    return children({ value, type, onChange: this.onChange });
  }
}

Field.propTypes = {
  title: PropTypes.string,
};

export default Field;
