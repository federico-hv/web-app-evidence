import { styled } from 'configs';

export const TextWrapper = styled('h1', {
  color: '$primary600',
  textAlign: 'center',
  fontFamily: 'Rubik',
  fontWeight: '500',
  variants: {
    size: {
      h1: {
        fontSize: '40px',
        lineHeight: '47px',
      },
      h2: {
        fontSize: '24px',
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
