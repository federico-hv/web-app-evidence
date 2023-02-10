import { styled } from 'configs';

export const StyledIncrementer = styled('div', {
  display: 'grid',
  width: '125px',
  border: '1px solid #d1d1d1',
  borderRadius: '$2',
  gridTemplateColumns: '1fr 2fr 1fr',
  color: '$base700',
  '& > .button, & > .label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& > .button': {
    border: 'none',
    backgroundColor: 'unset',
  },
  '& > .label': {
    flex: '1',
    marginLeft: '1rem',
    marginRight: '1rem',
    py: '$3',
  },
});
