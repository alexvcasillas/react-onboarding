import { STEP_TYPE_KEY } from './constants';

export function calculateNumberOfSteps(tree) {
  return tree.filter(leaf => leaf.type.name === STEP_TYPE_KEY).length;
}

export function enhanceStep(step, enhancements = {}) {
  if (step.type.name !== STEP_TYPE_KEY) step;
  return {
    ...step,
    props: {
      ...step.props,
      __enhancements: enhancements,
    },
  };
}

export function stepsFromTree(tree, enhancements = {}) {
  const numberOfSteps = calculateNumberOfSteps(tree);

  return tree
    .filter(leaf => leaf.type.name === STEP_TYPE_KEY)
    .map((leaf, index) => {
      return {
        ...leaf,
        props: {
          ...leaf.props,
          __enhancements: enhancements,
          __lastStep: index === numberOfSteps - 1,
        },
      };
    });
}
