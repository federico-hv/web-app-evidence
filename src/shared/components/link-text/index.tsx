import { Box, Text, theme } from '@holdr-ui/react';
import { LinkOverlay } from '../../styles';
import { LinkTextProps } from './types';

function LinkText({
  to,
  reloadDocument,
  replace,
  state,
  preventScrollReset,
  relative,
  ...props
}: LinkTextProps) {
  return (
    <Box position='relative'>
      <LinkOverlay
        to={to}
        reloadDocument={reloadDocument}
        replace={replace}
        state={state}
        relative={relative}
        preventScrollReset={preventScrollReset}
      />
      <Text
        {...props}
        css={{
          '&:hover': {
            transitionProperty: theme.transitions['property-common'],
            transitionDuration: theme.transitions['duration-faster'],
            transitionTimingFunction: 'ease',
            textDecoration: 'underline',
          },
        }}
      />
    </Box>
  );
}
LinkText.displayName = 'LinkText';

export default LinkText;
