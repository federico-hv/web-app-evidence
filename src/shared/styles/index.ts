import { css, styled } from '../../configs';
import { Link } from 'react-router-dom';

export const extraBtnPadding = css({
  py: '10px',
  height: '3rem !important',
  minWidth: '3rem !important',
});

export const LinkOverlay = styled(Link, {
  position: 'absolute',
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  zIndex: 10,
});

export const StyledLink = styled(Link, {
  width: 'fit-content',
});
