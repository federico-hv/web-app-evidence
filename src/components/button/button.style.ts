import { styled } from 'configs';

export const StyledButton = styled('button', {
  fontFamily: '$fonts.text',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  cursor: 'pointer',
  fontWeight: '$500',

  variants: {
    class: {
      disabled: {
        cursor: 'unset !important',
        backgroundColor: 'rgba(23, 23, 23, 0.25)',
        border: 'rgba(23, 23, 23, 0.25)',
        color: '#fff',
        padding: '1.25rem 0.75rem',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        borderRadius: '1.38rem',
        width: '100%',
      },
      primary: {
        backgroundColor: '$secondary400',
        padding: '1.25rem 0.75rem',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        borderRadius: '1.38rem',
        color: '$primary400',
        width: '100%',
      },
      secondary: {
        backgroundColor: '$primary600',
        padding: '1.25rem 0.75rem',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        borderRadius: '1.38rem',
        color: '$primary400',
        width: '100%',
      },
      neutral: {
        backgroundColor: 'rgba(251, 252, 245, 0.1)',
        color: '$primary600',
        padding: '1.25rem 0.75rem',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        borderRadius: '1.38rem',
        width: '100%',
        border: '1px solid $primary600',
      },
      tertiary: {
        borderRadius: '50px',
        color: '$primary400',
        fontSize: '1.125rem',
        lineHeight: '1.125rem',
        padding: '0.688rem 1.063rem',
        letterSpacing: '0.02em',
        backgroundColor: '$primary600',
      },
    },
  },
});
