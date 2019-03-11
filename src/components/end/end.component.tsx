import * as React from 'react';

import { OnboardingService, Tree } from '../../core/services/core.service';
import { END_TYPE_KEY } from '../../core/constants';

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

// @ts-ignore
End.__type = END_TYPE_KEY;

export default End;
