import React from 'react';

import { OnboardingService } from '../../core/services/core.service';

class End extends React.Component {
  state = {
    ...OnboardingService.tree,
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

End.propTypes = {};

export default End;
