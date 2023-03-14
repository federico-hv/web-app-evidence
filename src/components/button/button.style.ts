import { StyledComponent } from './../../layouts/template/component.style';
import { styled } from 'configs';

export const StyledButton = styled('button', {
  fontFamily: '$fonts.text',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  cursor: 'pointer',

  variants: {
    type: {
      primary: {
        backgroundColor: '$secondary400',
        padding: '20px 12px',
        fontWeight: '$500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        color: '$primary400',
        width: '100%',
      },
      secondary: {
        backgroundColor: '$primary600',
        padding: '20px 12px',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        color: '$primary400',
        width: '100%',
      },
      neutral: {
        backgroundColor: 'rgba(251, 252, 245, 0.1)',
        color: '$primary600',
        padding: '20px 12px',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        width: '100%',
        border: '1px solid $primary600',
      },
      tertiary: {
        borderRadius: '50px',
        color: '$primary400',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '18px',
        padding: '11px 17px',
        letterSpacing: '0.02em',
        backgroundColor: '$primary600',
      },
    },
  },
});
