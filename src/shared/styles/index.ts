import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Circle, css, styled } from '@holdr-ui/react';
import { keyframes } from '@stitches/react';

export const noShrink = css({
  flexShrink: 0,
});

export const MotionBox = motion(Box);
export const MotionDot = motion(Circle);

export const makeButtonLarger = (size: string, py = '10px', px = '0px') =>
  css({
    py,
    px,
    height: `${size} !important`,
    minWidth: `${size} !important`,
  })();

export const addPadding = ({ px, py }: { px?: string; py?: string }) =>
  css({
    py,
    px,
  })();

export const changeDimensions = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) =>
  css({
    height: `${height ? height : 'initial'} !important`,
    minWidth: `${width ? width : 'initial'} !important`,
  })();

export const extraBtnPadding = () => makeButtonLarger('3rem');

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
  height: '100%',
  width: '100%',
});

export const RadioWrapper = styled('label', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const customInputStyles = css({
  border: '1px solid rgba(152, 152, 255, 0.35) !important',
  backgroundColor: 'rgba(152, 152, 255, 0.15) !important',
  '&:focus': {
    border: '1px solid rgba(152, 152, 255, 1) !important',
    backgroundColor: 'transparent',
  },
});

export const darkInputStyles = css({
  border: '1px solid $purpleTint400 !important',
  borderRadius: '$2',
  backgroundColor: '#1A1A29 !important',
  height: '2.75rem !important',
  '&:focus': {
    border: '1px solid rgba(152, 152, 255, 1) !important',
    backgroundColor: 'transparent',
  },
});

export const textAreaClassName = css({
  height: '464px !important',
});

export const blink = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0.2 },
});

export const customBgColor = css({
  minHeight: '2rem !important',
  minWidth: '2rem !important',
  radius: '9999px',
  border: '1px solid rgba(152, 152, 255, 0.10)',
  background: 'rgba(133, 133, 255, 0.2)',
});
