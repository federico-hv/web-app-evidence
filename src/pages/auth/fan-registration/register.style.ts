import { styled } from 'configs';

export const RegisterParagraph = styled('p', {
  font: '$text',
  fontWeight: '$400',
  fontSize: '1.5rem',
  color: 'rgba(23, 23, 23, 0.65)',
  paddingBottom: '1.25rem',
});

export const Paragraph = styled('p', {
  paddingTop: '0.625rem',
  fontWeight: '300',
  span: {
    color: '$secondary400',
  },
});
