import { StyledComponent } from './../../layouts/template/component.style';
import { styled } from 'configs';

export const StyledButton = styled('button', {
  fontFamily: 'Rubik',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  cursor: 'pointer',
  // boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',

  variants: {
    type: {
      primary: {
        backgroundColor: '#6666FF',
        padding: '20px 12px',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        color: '#FBFCF5',
        width: '100%',
      },
      secondary: {
        backgroundColor: '#171717',
        padding: '20px 12px',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        color: '#FBFCF5',
        width: '100%',
      },
      neutral: {
        backgroundColor: 'rgba(251, 252, 245, 0.1)',
        color: '#171717',
        padding: '20px 12px',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        borderRadius: '22px',
        width: '100%',
        border: '1px solid #171717',
      },
      tertiary: {
        borderRadius: '50px',
        color: '#FBFCF5',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '18px',
        padding: '11px 17px',
        letterSpacing: '0.02em',
        backgroundColor: '#171717',
      },
    },
  },
});
