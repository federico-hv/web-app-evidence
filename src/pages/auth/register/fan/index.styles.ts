import { styled } from 'configs';

export const StyledForm = styled('div', {
  width: '100%',
});

export const ProgressBar = styled('div', {
  width: '260px',
  backgroundColor: 'rgba(23, 23, 23, 0.1)',
  margin: '20px 0 20px 0',
});

export const ProgressBarDiv = styled('div', {
  width: '92px',
  height: '5px',
  backgroundColor: '#6666FF',
  variants: {
    page: {
      '0': { width: '22.2%' },
      '1': { width: '44.4%' },
      '2': { width: '66.6%' },
      '3': { width: '100%' },
    },
  },
  defaultVariants: {
    page: '0',
  },
});
