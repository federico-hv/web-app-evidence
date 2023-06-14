import { css, styled } from '../configs';
import { motion } from 'framer-motion';
import { Box, HStack } from '@holdr-ui/react';

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

export const MotionWrapper = motion(HStack);

export const MotionBox = motion(Box);
