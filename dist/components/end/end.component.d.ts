import * as React from 'react';
import { Tree } from '../../core/services/core.service';
declare type Props = {
    children: Function;
};
declare type State = {
    tree: Tree;
};
declare class End extends React.Component<Props, State> {
    state: {
        tree: {};
    };
    render(): any;
}
export default End;
