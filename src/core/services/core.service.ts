export type Tree = {
  [x: string]: string;
};

interface IOnboardingService {
  tree: object;
  setStep(step: string): void;
  setField(field: string, step: string): void;
  setFieldValue(field: string, step: string, value: string): void;
  getFieldValue(field: string, step: string): string;
}

function OnboardingService(): IOnboardingService {
  const tree = {};
  function setStep(step) {
    if (tree[step]) return;
    tree[step] = {};
  }
  function setField(field, step) {
    if (typeof tree[step] === 'undefined') {
      setStep(step);
    }
    // Check if this field is already declared
    if (tree[step][field]) return;
    tree[step][field] = '';
  }
  function setFieldValue(field, step, value) {
    if (typeof tree[step] === 'undefined' || typeof tree[step][field] === 'undefined') return;
    tree[step][field] = value;
  }
  function getFieldValue(field, step) {
    if (typeof tree[step] === 'undefined' || typeof tree[step][field] === 'undefined') return '';
    return tree[step][field];
  }
  return {
    tree,
    setStep,
    setField,
    setFieldValue,
    getFieldValue,
  };
}

const onboardingService = OnboardingService();
export { onboardingService as OnboardingService };
