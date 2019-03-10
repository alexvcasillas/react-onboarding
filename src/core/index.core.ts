import { STEP_TYPE_KEY, FIELD_TYPE_KEY } from './constants';

type ReactEnhancedObject = {
  [x: string]: any;
  props: {
    [x: string]: any;
    __enhancements: any;
  };
};

/**
 * PUBLIC
 * This function calculates the number of steps that
 * are present in an Array of React Components.
 * This will only count the first level of steps due to
 * there's no reason for a step to be within a step.
 * @param {Array} tree
 */
export function calculateNumberOfSteps(tree: Array<ReactEnhancedObject>) {
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
export function enhanceStep(step: ReactEnhancedObject, enhancements: object = {}): object {
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
export function enhanceField(field: ReactEnhancedObject, enhancements: object = {}): object {
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
