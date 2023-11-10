import { HStack } from '@holdr-ui/react';
import { styled } from '../../../configs';

export const StyledStepperIndicator = styled(HStack, {
  '& .stepper__step': {
    variants: {
      active: {
        true: {
          backgroundColor: '$secondary400',
        },
      },
    },
  },
});
