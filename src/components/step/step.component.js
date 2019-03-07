import React from 'react';
import PropTypes from 'prop-types';

class Step extends React.Component {
  componentDidMount() {}
  render() {
    const {
      children,
      __enhancements: { nextStep },
      __lastStep,
    } = this.props;
    return <>{children({ nextStep, lastStep: __lastStep }) || null}</>;
  }
}

Step.propTypes = {
  __enhancements: PropTypes.shape({
    nextStep: PropTypes.func.isRequired,
  }),
};

export default Step;
