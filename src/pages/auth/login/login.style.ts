import { styled } from 'configs';

export const LoginParagraph = styled('p', {
  font: '$text',
  fontWeight: '$400',
  fontSize: '1.5rem',
  color: 'rgba(23, 23, 23, 0.65)',
  paddingBottom: '1.25rem',
});

export const StyledLoginForm = styled('div', {
  width: '100%',
});

export const Paragraph = styled('p', {
  paddingTop: '0.625rem',
  fontWeight: '300',
  span: {
    color: '$secondary400',
  },
});

export const Link = styled('a', {
  color: 'rgba(23, 23, 23, 0.35)',
  fontWeight: '$400',
  fontSize: '1.5rem',
  lineHeight: '1.75rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  position: 'relative',
  bottom: '1.5625rem',
  paddingTop: '0.65rem',
});

export const Line = styled('hr', {
  width: '648px',
  height: '0px',
  marginBottom: '0.625rem',
  border: '0.5px solid rgba(23, 23, 23, 0.1)',
});
