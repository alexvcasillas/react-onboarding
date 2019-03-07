import { STEP_TYPE_KEY, FIELD_TYPE_KEY } from './constants';
const uuid = require('uuid/v4');
/**
 * PUBLIC
 * This function calculates the number of steps that
 * are present in an Array of React Components.
 * This will only count the first level of steps due to
 * there's no reason for a step to be within a step.
 * @param {Array} tree
 */
export function calculateNumberOfSteps(tree) {
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
export function enhanceStep(step, enhancements = {}) {
  if (step.type.name !== STEP_TYPE_KEY) return step;
  return {
    ...step,
    key: uuid(),
    props: {
      ...step.props,
      __enhancements: enhancements,
    },
  };
}
/**
 * INTERNAL
 * This function returns all of the steps that
 * are present in an Array of React Components.
 * @param {Array} tree
 */
function stepsFromTree(tree) {
  return tree.filter(leaf => leaf.type.name === STEP_TYPE_KEY);
}
/**
 * PUBLIC
 * This function will generate the onboarding tree
 * that we will use to store all of the values from
 * fields within steps to provide it whenever's required
 * @param {Array} tree
 */
export function generateOnboardingTree(tree) {
  const steps = stepsFromTree(tree);
  const onboarding = {};
  steps.forEach(step => {
    const snaked_name = step.props.name.replace(/-/gi, '_');
    Object.defineProperty(onboarding, snaked_name, { value: {} });
  });
  return onboarding;
}
/**
 * PUBLIC
 * This function will generate
 * @param {Object} onboardingTree
 * @param {Object} step
 */
export function generateFieldsFromStep(onboardingTree, step) {
  console.log({ onboardingTree, step });
}

/**
 * PUBLIC
 * This function enhaces a field (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */
export function enhanceField(field, enhancements = {}) {
  if (field.type.name !== FIELD_TYPE_KEY) return field;
  return {
    ...field,
    key: uuid(),
    props: {
      ...field.props,
      __enhancements: enhancements,
    },
  };
}
