import * as React from 'react';
import { StepEnhancements } from '../../core/index.core';
declare type Props = {
    name: string;
    conversational: boolean;
    children: (props: StepEnhancements) => JSX.Element;
    __enhancements: StepEnhancements;
};
declare type State = {
    validStep: boolean;
    processed: boolean;
};
declare class Step extends React.Component<Props, State> {
    step: string;
    constructor(props: Readonly<Props>);
    setValidStep: (isValid: boolean) => void;
    setProcessed: (processed: boolean) => void;
    componentDidMount(): void;
    stepRenderer: () => JSX.Element | JSX.Element[];
    render(): JSX.Element | JSX.Element[];
}
export default Step;
