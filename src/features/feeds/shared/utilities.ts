import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

export function getDialogColors(theme: 'secondary' | 'primary'): {
  bgColor: ThemeColor | string;
  buttonColor: ThemeColor | string;
  iconButtonColor: ThemeColor;
  color: string;
  tabColor: {
    active: string;
    inactive: string;
  };
} {
  if (theme === 'secondary') {
    return {
      bgColor: 'rgba(255, 255, 255)',
      buttonColor: '',
      iconButtonColor: 'base800',
      color: 'rgba(0, 0, 0)',
      tabColor: {
        active: '$base800',
        inactive: '$white700',
      },
    };
  } else {
    return {
      bgColor: 'rgba(64, 64, 102, 0.80)',
      buttonColor: '',
      iconButtonColor: 'white500',
      color: 'white500',
      tabColor: {
        active: '$white500',
        inactive: '$white700',
      },
    };
  }
}
