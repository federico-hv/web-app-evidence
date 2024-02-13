import { hexToRGB } from '../../../shared';

export const cardHoverStyle = {
  '.membership-card__footer': {
    transform: 'translateY(-376px)',
    backgroundColor: hexToRGB('#30304B', 0.75),
  },
  '.membership-card__opaque-cover': {
    display: 'block',
  },
  '.membership-card__perk-details': {
    display: 'flex',
  },
};

export const cardFooterStyle = {
  backgroundColor: '#30304B',
  transform: 'translateY(-120px)',
  border: '1px solid rgba(152, 152, 255, 0.10)',
  transition: 'all 0.25s linear',
  userSelect: 'none',
};
