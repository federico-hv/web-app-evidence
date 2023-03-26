import { styled } from 'configs';

export const LoginWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LoginParagraph = styled('p', {
  font: '$text',
  fontWeight: '$400',
  fontSize: '1.5rem',
  color: 'rgba(23, 23, 23, 0.65)',
  paddingBottom: '1.25rem',
});

export const LoginWrapperBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '786px',
  width: '100%',
  background: 'rgba(251, 252, 245, 0.1)',
  border: '1px solid rgba(251, 252, 245, 0.65)',
  boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.12)',
  gap: '1.25rem',
  borderRadius: '1.375rem',
  padding: '60px',
  margin: '115px 0 115px 0',

  h1: {
    paddingBottom: '1.25rem',
  },
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
});

export const Line = styled('hr', {
  width: '648px',
  height: '0px',
  marginBottom: '0.625rem',
  border: '0.5px solid rgba(23, 23, 23, 0.1)',
});
