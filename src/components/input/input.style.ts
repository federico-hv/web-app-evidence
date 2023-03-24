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

export const StyledInputError = styled('div', {
  label: {
    color: '$primary800',
    fontFamily: '$text',
    fontstyle: 'normal',
    fontWeight: '$500',
    fontSize: '0.75px',
    lineHeight: '1.125rem',
  },
});
