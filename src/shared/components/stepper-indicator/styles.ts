import { HStack, styled } from '@holdr-ui/react';

export const StyledStepperIndicator = styled(HStack, {
  '& .stepper__step': {
    variants: {
      active: {
        true: {
          backgroundColor: '$purple500',
        },
      },
    },
  },
});
