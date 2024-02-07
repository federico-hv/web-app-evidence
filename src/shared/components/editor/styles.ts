import { css } from '@holdr-ui/react';

export const editorStyles = css({
  width: '$auto',
  height: '$full',
  paddingInline: '$3',
  '&:hover': {
    cursor: 'pointer',
  },
});

export const popoverStyles = css({
  zIndex: '$100',
  position: 'absolute',
  top: '100%',
  listStyle: 'none',
});
