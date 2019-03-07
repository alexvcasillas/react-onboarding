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
    setFieldValue,
  };
}

const onboardingService = OnboardingService();
export { onboardingService as OnboardingService };
