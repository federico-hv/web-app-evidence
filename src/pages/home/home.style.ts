import { styled } from 'configs';

export const HomeWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '168px',
});

export const HorizontalLine = styled('hr', {
  width: '65px',
  height: '0px',
  border: '6px solid #171717',
});

export const HomeBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '786px',
  width: '100%',
  background: 'rgba(251, 252, 245, 0.1)',
  border: '1px solid rgba(251, 252, 245, 0.65)',
  boxShadow: '1px 4px 13px rgba(0, 0, 0, 0.12)',
  gap: '20px',
  borderRadius: '22px',
  padding: '60px',
  margin: '115px 0 115px 0',

  h1: {
    paddingBottom: '20px',
  },
});

export const HomeParagraph = styled('p', {
  paddingTop: '10px',
  fontWeight: '300',
  span: {
    color: '#6666FF',
  },
});
