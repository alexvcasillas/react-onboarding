import React from 'react';

import { OnboardingService, Tree } from '../../core/services/core.service';

type Props = {
  children: Function;
};
type State = {
  tree: Tree;
};

class End extends React.Component<Props, State> {
  state = {
    tree: { ...OnboardingService.tree },
  };

  render() {
    const children: Function = this.props.children;
    return children(this.state.tree);
  }
}

export default End;
