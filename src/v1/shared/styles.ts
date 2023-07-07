import { css, styled } from '../configs';
import { motion } from 'framer-motion';
import { Box, HStack } from '@holdr-ui/react';
import { Link } from 'react-router-dom';

export const style = styled('div', {
  background: 'rgba(251, 252, 245, 0.01)',
});

export const extraBtnPadding = css({
  py: '10px',
  height: '2.75rem !important',
});

export const textEllipsis = css({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const settingButtonHoverCss = css({
  '&:hover': {
    backgroundColor: '$base100',
  },
});

export const CustomLabel1 = styled('label', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const LinkOverlay = styled(Link, {
  position: 'absolute',
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
});

export const MotionBox = motion(Box);

export const MotionWrapper = motion(HStack);
