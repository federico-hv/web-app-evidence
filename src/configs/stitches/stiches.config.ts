/* eslint-disable  @typescript-eslint/no-explicit-any */

import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  '@import':
    'url(../../styles/matter.font.css), url(../../styles/general-sans.font.css)',
  ':root': {
    fontFamily: 'Matter, ui-sans-serif, system-ui',
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '-webkit-text-size-adjust': '100%',
    fontSize: '16px',
  },
  '*': {
    margin: 0,
    outline: 0,
    padding: 0,
    border: 0,
  },
  body: {
    backgroundColor: '#141317',
    color: '#FFFFFF',
  },
  'h1, h2, h3, h4, h5': {
    fontFamily: 'GeneralSans, ui-sans-serif, system-ui',
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  textarea: {
    fontFamily: 'inherit',
  },
  select: {
    color: 'inherit',
  },
  'input[type=date]': {
    fontFamily: 'inherit',
  },
  'input:autofill, input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
    {
      background: 'transparent',
    },
  'input, select': {
    boxSizing: 'border-box',
    width: '100%',
  },
  'select, option': {
    '-webkit-appearance': 'none',
  },
  button: {
    backgroundColor: 'inherit',
    fontFamily: 'inherit',
    border: 'inherit',
    cursor: 'pointer',
  },
});
