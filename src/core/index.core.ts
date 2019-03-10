import { STEP_TYPE_KEY, FIELD_TYPE_KEY } from './constants';

export type StepEnhancements = {
  nextStep: Function;
  prevStep: Function;
  validStep?: boolean;
};

export type EnhancedStep = JSX.Element & {
  nextStep: Function;
  prevStep: Function;
};

export type FieldEnhancements = {
  step: string;
  setProcessed: Function;
  setValidStep: Function;
};

export type EnhancedField = JSX.Element & {
  step: string;
  setProcessed: Function;
  setValidStep: Function;
};

/**
 * PUBLIC
 * This function calculates the number of steps that
 * are present in an Array of React Components.
 * This will only count the first level of steps due to
 * there's no reason for a step to be within a step.
 * @param {Array} tree
 */
export function calculateNumberOfSteps(tree: JSX.Element[] | JSX.Element): number {
  if (Array.isArray(tree)) {
    return tree.filter((leaf: JSX.Element) => leaf.type.name === STEP_TYPE_KEY).length;
  }
  return tree.type.name === STEP_TYPE_KEY ? 1 : 0;
}
/**
 * PUBLIC
 * This function enhaces a step (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */
export function enhanceStep(step: JSX.Element, enhancements: StepEnhancements): JSX.Element | EnhancedStep {
  if (step.type.name !== STEP_TYPE_KEY) return step;
  return {
    ...step,
    key: step.props.name,
    props: {
      ...step.props,
      __enhancements: enhancements,
    },
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
export function enhanceField(field: JSX.Element, enhancements: FieldEnhancements): JSX.Element | EnhancedField {
  if (field.type.name !== FIELD_TYPE_KEY) return field;
  return {
    ...field,
    key: field.props.name,
    props: {
      ...field.props,
      __enhancements: enhancements,
    },
  };
}
