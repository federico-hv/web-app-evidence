import { styled } from 'configs';

export const ImageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  label: {
    color: 'rgba(23, 23, 23, 0.35)',
    fontWeight: 'bold',
  },
});

export const Image = styled('img', {
  width: '104px',
  height: '104px',
  borderRadius: '50%',
});

export const AvatarImage = styled('img', {});
