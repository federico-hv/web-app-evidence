import { css, styled } from '../../../configs';
import { Textarea } from '@holdr-ui/react';

const StyledTextarea = styled(Textarea, {
  borderWidth: '0 !important',
  '@bp1': {},
  '@bp3': {},
  variants: {
    fontSize: {
      lg: {
        '&::placeholder': {
          fontSize: '$4 !important',
        },
        fontSize: '$4 !important',
      },
      sm: {
        '&::placeholder': {
          fontSize: '$3 !important',
        },
        fontSize: '$3 !important',
      },
    },
  },
});

const topRight = css({
  position: 'absolute !important',
  top: '$3',
  right: '$3',
});

export { StyledTextarea, topRight };
