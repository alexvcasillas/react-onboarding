export type Field = Map<string, any>;
export type Steps = Map<string, Field>;

interface IOnboardingService {
  tree: object;
  setStep(step: string): void;
  setField(field: string, step: string): void;
  setFieldValue(field: string, step: string, value: string): void;
  getFieldValue(field: string, step: string): string;
  getResult: () => object;
}

function OnboardingService(): IOnboardingService {
  const tree: Steps = new Map();

  function setStep(name: string) {
    if (tree.get(name)) return;

    tree.set(name, new Map());
  }

  function setField(fieldName: string, stepName: string) {
    const step = tree.get(stepName);

    if (!step) {
      throw new Error(
        `Tying to set the value of a field on a non-existing step [${stepName}]`,
      );
    }

    const field = step.get(fieldName);

    // If the field already exists, do nothing, we don't want to override it
    if (field) {
      return;
    }

    step.set(fieldName, '');
  }

  function setFieldValue(fieldName: string, stepName: string, value: string) {
    const step = tree.get(stepName);

    if (!step) {
      throw new Error(
        `Tying to set the value of a field on a non-existing step [${stepName}]`,
      );
    }

    const field = step.get(fieldName);

    // If the field already exists, do nothing, we don't want to override it
    if (!field) {
      throw new Error(
        `Trying to set a value on a non-existing field [${fieldName}]`,
      );
    }

    step.set(fieldName, value);
  }

  function getFieldValue(fieldName: string, stepName: string) {
    const step = tree.get(stepName);

    if (!step) {
      throw new Error(
        `Tying to set the value of a field on a non-existing step [${stepName}]`,
      );
    }

    return step.get(fieldName);
  }

  function getResult() {
    return Object.fromEntries(tree);
  }

  return {
    tree,
    setStep,
    setField,
    setFieldValue,
    getFieldValue,
    getResult,
  };
}

const onboardingService = OnboardingService();
export { onboardingService as OnboardingService };
