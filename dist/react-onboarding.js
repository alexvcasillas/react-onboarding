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

const STEP_TYPE_KEY = 'Step';

function calculateNumberOfSteps(tree) {
  return tree.filter(leaf => leaf.type.name === STEP_TYPE_KEY).length;
}
function enhanceStep(step, enhancements = {}) {
  if (step.type.name !== STEP_TYPE_KEY) ;
  return { ...step,
    props: { ...step.props,
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

    _defineProperty(this, "onOnboardingComplete", () => {
      const {
        onOnboardingComplete
      } = this.props;
      onOnboardingComplete();
    });

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

  render() {
    const {
      currentStep
    } = this.state;
    return React.createElement(Provider, {
      value: {
        numberOfSteps: this.numberOfSteps,
        currentStep: currentStep + 1
      }
    }, this.onboardingRenderer());
  }

}

Onboarding.propTypes = {
  initialStep: PropTypes.number
};
 // export default Onboarding;

class Step extends React.Component {
  componentDidMount() {}

  render() {
    const {
      children,
      __enhancements: {
        nextStep
      },
      __lastStep
    } = this.props;
    return React.createElement(React.Fragment, null, children({
      nextStep,
      lastStep: __lastStep
    }) || null);
  }

}

Step.propTypes = {
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
  render() {
    const {
      children
    } = this.props;
    return children || null;
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
