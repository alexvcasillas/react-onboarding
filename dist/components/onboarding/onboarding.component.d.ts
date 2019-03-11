import * as React from 'react';
declare const Consumer: React.ExoticComponent<React.ConsumerProps<{}>>;
declare type Props = {
    initialStep: number;
    finished: boolean;
    children: JSX.Element[] | JSX.Element;
};
declare type State = {
    initialStep: number;
    currentStep: number;
};
declare class Onboarding extends React.Component<Props, State> {
    numberOfSteps: number;
    constructor(props: Readonly<Props>);
    nextStep: () => void;
    prevStep: () => void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    onboardingRenderer: () => JSX.Element | JSX.Element[];
    render(): JSX.Element;
}
export { Onboarding, Consumer as Info };
