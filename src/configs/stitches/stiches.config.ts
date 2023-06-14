/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createStitches, globalCss } from '@stitches/react';

export const { styled, css, theme, keyframes } = createStitches({
  prefix: 'holdr-ui',
  theme: {
    colors: {
      primary100: '#F5FCEF',
      primary200: '#FBFCf0',
      primary300: '#c3c4bc',
      primary400: '#FBFCF4',
      primary500: '#fbfcf503',
      primary600: '#171717',
      primary700: '#1717173f',
      primary800: '#d3190b',
      secondary100: '#a8a8ff',
      secondary200: '#8b8bfc',
      secondary300: '#7878fe',
      secondary400: '#6666FF',
      accent100: '#e0ff73',
      accent200: '#ddfe6a',
      accent300: '#d9fe58',
      accent400: '#D7FD52',
      base100: '#f2f2f2',
      base200: '#d2d2d2',
      base300: '#adadad',
      base400: '#676767',
      base500: '#3b3b3b',
      base600: '#202020',
      base700: '#080808',
      base800: '#080808',
      white: '#FFFFFF',
      black: '#000000',
      info: '#02b9af',
      success: '#56d448',
      warning: '#fb9c28',
      danger: '#f24646',
      initial: 'initial',
      inherit: 'inherit',
      transparent: 'transparent',
      currentColor: 'currentColor',
      clearTint300: 'rgba(255, 255, 255, 0.25)',
      clearTint400: 'rgba(255, 255, 255, 0.5)',
      clearTint500: 'rgba(255, 255, 255, 0.75)',
      darkTint300: 'rgba(0,0,0,0.25)',
      darkTint400: 'rgba(0,0,0,0.5)',
      darkTint500: 'rgba(0,0,0,0.75)',
      lightTint: 'rgba(0, 0, 0, 0.1)',
    },
    space: {
      0: '0px',
      1: '0.125rem',
      2: '0.25rem',
      3: '0.5rem',
      4: '1rem',
      5: '1.5rem',
      6: '2rem',
      7: '2.5rem',
      8: '3rem',
    },
    fontSizes: {
      1: '0.65rem',
      2: '0.75rem',
      3: '1rem',
      4: '1.25rem',
      5: '1.5rem',
      6: '1.75rem',
      7: '2rem',
      8: '2.25rem',
      9: '3rem',
      10: '2.5rem',
    },
    fonts: {
      text: 'Rubik Sans, apple-system, sans-serif',
      mono: 'Mono, monospace',
    },
    fontWeights: {
      '100': 100,
      '200': 200,
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
      '800': 800,
    },
    lineHeights: {
      1: '0.9rem',
      2: '1rem',
      3: '1.25rem',
      4: '1.5rem',
      5: '1.75rem',
      6: '2rem',
      7: '2.25rem',
      8: '2.5rem',
      9: '2.9rem',
      10: '3.5rem',
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
    },
    sizes: {
      1: '1.25rem',
      2: '1.5rem',
      3: '1.75rem',
      4: '2rem',
      5: '2.25rem',
      6: '2.5rem',
      7: '3rem',
      8: '4rem',
      'chk-sm': '0.75rem',
      'chk-base': '1rem',
      'chk-lg': '1.25rem',
      xs: '20rem',
      sm: '24rem',
      base: '28rem',
      lg: '32rem',
      xl: '36rem',
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fr: 'minmax(0, 1fr)',
      'w-screen': '100vw',
      'h-screen': '100vh',
      full: '100%',
      'blur-xs': '4px',
      'blur-sm': '8px',
      'blur-base': '12px',
      'blur-lg': '18px',
      'blur-xl': '24px',
    },
    borderWidths: {
      0: 0,
      1: '1px',
      2: '2px',
      3: '3px',
    },
    // borderStyles: {},
    radii: {
      0: '0px',
      1: '0.125rem',
      2: '0.25rem',
      3: '0.5rem',
      4: '0.75rem',
      full: '9999px',
    },
    shadows: {
      0: '',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      lg: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      xl: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      '2xl':
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      'button-shadow-lg': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      'button-shadow-lg-light': 'rgba(255, 255, 255, 0.24) 0px 3px 8px',
      'button-shadow-base': 'rgba(0, 0, 0, 0.15) 0px 4px 12px',
      'button-shadow-base-light': 'rgba(255, 255, 255, 0.15) 0px 4px 12px',
    },
    zIndices: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      10: 10,
      50: 50,
      100: 100,
      1000: 1000,
      1500: 1500,
      2000: 2000,
    },
    media: {
      mobileSm: '',
      mobileLg: '',
      tablet: '',
      laptop: '',
      desktop: '',
      tv: '',
    },
    transitions: {
      'duration-super-fast': '50ms',
      'duration-faster': '100ms',
      'duration-fast': '150ms',
      'duration-normal': '200ms',
      'duration-slow': '350ms',
      'duration-slower': '400ms',
      'duration-super-slow': '500ms',
      'property-common':
        'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,outline;',
      'property-colors': 'background-color,border-color,color,fill,stroke',
      'property-height': 'width,height',
      'property-position': 'left,right,top,bottom',
      'property-background':
        'background-color,background-image,background-position',
    },
  },

  utils: {
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    p: (value: any) => ({
      padding: value,
    }),
    size: (value: any) => ({
      height: value,
      width: value,
    }),
    bg: (value: any) => ({
      backgroundColor: value,
    }),
    radius: (value: any) => ({
      borderRadius: value,
    }),
    blur: (value: any) => ({
      backdropFilter: `blur(${value})`,
    }),
    borderBottomRadius: (value: any) => ({
      borderBottomLeftRadius: value,
      borderBottomRightRadius: value,
    }),
  },
});

export const globalStyles = globalCss({
  '@import':
    "url('https://fonts.googleapis.com/css2?family=Rubik:wght@100;200;300;400;500;600;700;800;900&display=swap')",
  ':root': {
    fontFamily: 'Rubik, ui-sans-serif, system-ui',

    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '-webkit-text-size-adjust': '100%',
  },
  '*': {
    margin: 0,
    outline: 0,
    padding: 0,
    border: 0,
  },
  body: {
    backgroundColor: '#fbfbfa',
    fontFamily: 'Rubik, ui-sans-serif, system-ui',
  },
  a: {
    'text-decoration': 'none',
    color: 'inherit',
  },
  textarea: {
    fontFamily: 'inherit',
  },
  'input[type=date]': {
    fontFamily: 'inherit',
  },
  button: {
    backgroundColor: 'inherit',
    fontFamily: 'inherit',
  },
});
