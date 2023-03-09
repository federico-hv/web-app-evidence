import { styled } from 'configs';

export const TextWrapper = styled('h1', {
  color: '$primary600',
  textAlign: 'center',
  variants: {
    size: {
      h1: {
        fontSize: '40px',
        fontFamily: 'Rubik',
        fontWeight: '500',
        lineHeight: '47px',
      },
      h2: {
        fontSize: '24px',
        fontWeight: '500',
        fontFamily: 'Rubik',
        lineHeight: '28px',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
      },
      false: {
        textTransform: 'none',
      },
    },
  },
});
