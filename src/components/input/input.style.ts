import { styled } from 'configs';

export const StyledInput = styled('div', {
  input: {
    fontFamily: '$text',
    color: 'rgba(23, 23, 23, 0.35)',
    fontWeight: '$400',
    fontSize: '1.5rem',
    height: '4.25rem',
    width: '668px',
    border: '1px solid $primary700',
    borderRadius: '1rem',
    paddingLeft: '3.125rem',
    '&::placeholder': {
      color: 'rgba(23, 23, 23, 0.35)',
    },
  },
});

export const StyledInputEmailIcon = styled('span', {
  position: 'relative',
  textAlign: 'right',
  left: '1.125rem',
  bottom: '2.69rem',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  cursor: 'pointer',
});

export const StyledInputPasswordIcon = styled('span', {
  position: 'relative',
  textAlign: 'right',
  left: '1.25rem',
  bottom: '3.49rem',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  cursor: 'pointer',
});

export const StyledInputShowPasswordIcon = styled('span', {
  position: 'relative',
  left: '613px',
  bottom: '2.96rem',
  cursor: 'pointer',
});

export const StyledPasswordError = styled('p', {
  color: 'red',
  fontWeight: '$500',
  position: 'relative',
  bottom: '2.125rem',
  paddingLeft: '0.5rem',
});

export const StyledEmailError = styled('p', {
  color: 'red',
  fontWeight: '$500',
  position: 'relative',
  bottom: '1.25rem',
  paddingLeft: '0.5rem',
});
