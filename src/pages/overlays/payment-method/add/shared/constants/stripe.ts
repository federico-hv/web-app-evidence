import { hexToRGB, THEME_COLOR } from '@holdr-ui/react';

export const StripeCardElementStyles = {
  style: {
    base: {
      fontSmoothing: 'antialiased',
      fontFamily: 'Matter, sans-serif',
      '::placeholder': {
        color: hexToRGB(THEME_COLOR.base400, 1),
      },
      color: '#FCFDF7',
    },
  },
};
