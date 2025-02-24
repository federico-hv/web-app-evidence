import { hexToRGB } from '../../../shared';

export const cardHoverStyle = {
  '.membership-card__footer': {
    transform: 'translateY(-376px)',
    backgroundColor: hexToRGB('#30304B', 0.75),
  },
  '.membership-card__opaque-cover': {
    height: '54px',
  },
  '.membership-card__footer-wrapper': {
    top: 48,
  },
  '.membership-card__header': {
    zIndex: 2,
  },
  // '.membership-card__perk-details': {
  //   display: 'flex',
  // },
};

export const transitionDelay = 1;

export const cardFooterStyle = {
  backgroundColor: '#30304B',
  transform: 'translateY(-120px)',
  transition: `all 0.2s ease ${transitionDelay}s`,
  userSelect: 'none',
};
