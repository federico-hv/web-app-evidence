import { styled } from 'configs';

export const NavigationWrapper = styled('div', {
  width: '100%',
  background: '$primary500',
  boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.1)',
  padding: '12px 18px',
});

export const NavigationLogo = styled('img', {
  width: '145px',
  height: '53px',
  objectFit: 'contain',
});

export const NavigationContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
