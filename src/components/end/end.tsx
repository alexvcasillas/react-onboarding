import React from 'react';
import { END_TYPE_KEY } from '../../core/constants';
import { OnboardingService } from '../../core/services/core.service';

export const End = ({
  children,
}: {
  children: ({ result }: { result: object }) => React.ReactNode;
}): React.ReactNode => {
  return children({ result: OnboardingService.tree });
};

End.__type = END_TYPE_KEY;
