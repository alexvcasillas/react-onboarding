/// <reference types="react" />
export declare type StepEnhancements = {
    nextStep: Function;
    prevStep: Function;
    validStep?: boolean;
};
export declare type EnhancedStep = JSX.Element & {
    nextStep: Function;
    prevStep: Function;
};
export declare type FieldEnhancements = {
    step: string;
    setProcessed: Function;
    setValidStep: Function;
};
export declare type EnhancedField = JSX.Element & {
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
export declare function calculateNumberOfSteps(tree: JSX.Element[] | JSX.Element): number;
/**
 * PUBLIC
 * This function enhaces a step (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */
export declare function enhanceStep(step: JSX.Element, enhancements: StepEnhancements): JSX.Element | EnhancedStep;
/**
 * PUBLIC
 * This function enhaces a field (React Object) with
 * some required internal data to make the system work
 * as expected.
 * @param {Object} step
 * @param {Object} enhancements
 */
export declare function enhanceField(field: JSX.Element, enhancements: FieldEnhancements): JSX.Element | EnhancedField;
