import * as React from 'react';
import { FieldEnhancements } from '../../core/index.core';
declare type Validation = {
    name: string;
    on: string;
    validator: Function;
    errorMessage: string;
};
declare type FieldHanders = {
    value: string;
    type: string;
    onChange: Function;
    onBlur: Function;
    onFocus: Function;
    onEnter: Function;
    error: string;
    valid: boolean;
};
declare type Props = {
    __enhancements: FieldEnhancements;
    validations: Validation[];
    name: string;
    type: string;
    children: (props: FieldHanders) => JSX.Element;
};
declare type State = {
    value: string;
    valid: boolean;
    error: string;
};
declare class Field extends React.Component<Props, State> {
    step: string;
    snaked_name: string;
    constructor(props: Props);
    onChange: (value: string) => Promise<any>;
    onFocus: () => Promise<any>;
    onBlur: () => Promise<any>;
    onEnter: (enterCallback: Function) => void;
    render(): JSX.Element;
}
export default Field;
