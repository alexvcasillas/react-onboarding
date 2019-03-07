import React from 'react';
import PropTypes from 'prop-types';
import { OnboardingService } from '../../core/services/core.service';

class Field extends React.Component {
  constructor(props) {
    super(props);
    const {
      __enhancements: { step },
    } = this.props;
    this.snaked_name = props.name.replace(/-/gi, '_');
    this.step = step;
    OnboardingService.setField(this.snaked_name, step);
    this.state = {
      type: props.type,
      value: '',
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
