import { css, styled } from '../../configs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box } from '@holdr-ui/react';

export const extraBtnPadding = css({
  py: '10px',
  height: '3rem !important',
  minWidth: '3rem !important',
});

export const MotionBox = motion(Box);

export const LinkOverlay = styled(Link, {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

export const StyledLink = styled(Link, {
  width: 'fit-content',
});

export const StyledVideo = styled('video', {
  position: 'absolute',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});

export const RadioWrapper = styled('label', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CenteredImage = css({
  '& span': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& img': {
    height: 'auto',
    width: '100%',
    minHeight: 'unset',
  },
});
