'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function OnboardingService() {
  const tree = {};

  function setStep(step) {
    console.log('setStep: ', step);
    if (tree[step]) return;
    tree[step] = {};
  }

  function setField(field, step) {
    console.log('setField: ', field, step);

    if (typeof tree[step] === 'undefined') {
      setStep(step);
    }

    tree[step][field] = null;
  }

  function setFieldValue(field, step, value) {
    console.log('setFieldValue: ', field, step, value);
    if (typeof tree[step] === 'undefined' || typeof tree[step][field] === 'undefined') return;
    tree[step][field] = value;
  }

  return {
    tree,
    setStep,
    setField,
    setFieldValue
  };
}

const onboardingService = OnboardingService();

const STEP_TYPE_KEY = 'Step';
const FIELD_TYPE_KEY = 'Field';

const uuid = require('uuid/v4');
/**
 * PUBLIC
 * This function calculates the number of steps that
 * are present in an Array of React Components.
 * This will only count the first level of steps due to
 * there's no reason for a step to be within a step.
 * @param {Array} tree
 */


function calculateNumberOfSteps(tree) {
  return tree.filter(leaf => leaf.type.name === STEP_TYPE_KEY).length;
}
/**
 * PUBLIC
 * This function enhaces a step (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */

function enhanceStep(step, enhancements = {}) {
  if (step.type.name !== STEP_TYPE_KEY) return step;
  return { ...step,
    key: uuid(),
    props: { ...step.props,
      __enhancements: enhancements
    }
  };
}
/**
 * PUBLIC
 * This function enhaces a field (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */

function enhanceField(field, enhancements = {}) {
  if (field.type.name !== FIELD_TYPE_KEY) return field;
  return { ...field,
    key: uuid(),
    props: { ...field.props,
      __enhancements: enhancements
    }
  };
}

const {
  Provider,
  Consumer
} = React.createContext();

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "nextStep", () => {
      const {
        currentStep
      } = this.state; // Check if we want to move beyond the last step

      if (currentStep + 1 >= this.numberOfSteps) return;
      this.setState(prevState => ({ ...prevState,
        currentStep: prevState.currentStep + 1
      }));
    });

    _defineProperty(this, "onboardingRenderer", () => {
      const {
        children
      } = this.props;
      const {
        currentStep
      } = this.state;
      let encounteredStep = 0;
      let stepFound = false;
      const extendedChildrens = children.filter(child => {
        // It's not child type, return it immediately
        if (child.type.name !== STEP_TYPE_KEY) return true; // Is this the step we're looking for?

        if (encounteredStep === currentStep && !stepFound) {
          stepFound = true;
          return true;
        }

        encounteredStep = encounteredStep + 1;
        return false;
      }).map(child => {
        if (child.type.name !== STEP_TYPE_KEY) return child;
        const snaked_name = child.props.name.replace(/-/gi, '_');
        onboardingService.setStep(snaked_name);
        return enhanceStep(child, {
          nextStep: this.nextStep
        });
      });
      return extendedChildrens;
    });

    this.state = {
      initialStep: props.initialStep || 0,
      currentStep: props.initialStep || 0
    };
    this.numberOfSteps = calculateNumberOfSteps(props.children);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      currentStep
    } = this.state;
    return currentStep !== nextState.currentStep;
  }

  render() {
    const {
      currentStep
    } = this.state;
    return React.createElement(Provider, {
      value: {
        numberOfSteps: this.numberOfSteps,
        currentStep: currentStep + 1,
        onboarding: onboardingService.tree
      }
    }, this.onboardingRenderer());
  }

}

Onboarding.propTypes = {
  initialStep: PropTypes.number
};
 // export default Onboarding;

class Step extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "stepRenderer", () => {
      const {
        children,
        name: stepName,
        __enhancements: {
          nextStep
        }
      } = this.props;
      const prerenderedChildren = children({
        nextStep
      }).props.children;
      return prerenderedChildren.map(child => {
        return enhanceField(child, {
          step: stepName.replace(/-/gi, '_')
        });
      });
    });
  }

  render() {
    return this.stepRenderer();
  }

}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  __enhancements: PropTypes.shape({
    nextStep: PropTypes.func.isRequired
  })
};

class Fieldset extends React.Component {
  render() {
    const {
      children
    } = this.props;
    return children || null;
  }

}

Fieldset.propTypes = {};

class Field extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      onboardingService.setFieldValue(this.snaked_name, this.step, e.target.value);
      this.setState({
        value: e.target.value
      });
    });

    const {
      __enhancements: {
        step
      }
    } = this.props;
    this.snaked_name = props.name.replace(/-/gi, '_');
    this.step = step;
    onboardingService.setField(this.snaked_name, step);
    this.state = {
      type: props.type,
      value: ''
    };
  }

  render() {
    const {
      children
    } = this.props;
    const {
      type,
      value
    } = this.state;
    return children({
      value,
      type,
      onChange: this.onChange
    });
  }

}

Field.propTypes = {
  title: PropTypes.string
};

exports.Onboarding = Onboarding;
exports.Info = Consumer;
exports.Step = Step;
exports.Fieldset = Fieldset;
exports.Field = Field;
