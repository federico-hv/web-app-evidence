import { styled } from '@holdr-ui/react';
import { css } from '../../../../configs';

export const Slider = styled('input', {
  '&': {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: '100%',
    height: '3px',
    borderRadius: 9999,
    backgroundColor: '$base200',
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity .2s',
  },
  '&::-webkit-slider-thumb': {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: '1rem',
    height: '1rem',
    borderRadius: '100%',
    background: '$base800',
    cursor: 'pointer',
  },
  '&::-moz-range-thumb': {
    width: '1rem',
    height: '1rem',
    borderRadius: '100%',
    background: '$base800',
    cursor: 'pointer',
  },
});

export const removeButtonCSS = css({
  backdropFilter: 'blur(12px)',
});
