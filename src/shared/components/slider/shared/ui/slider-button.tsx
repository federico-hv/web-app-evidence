import { IconButton } from '@holdr-ui/react';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';
import { useSliderContext } from '../contexts';

function SliderButton({
  icon,
  ariaLabel,
  colorTheme = 'base100',
  style = { opacity: 0.75 },
  onClick,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <IconButton
      ariaLabel={ariaLabel}
      icon={icon}
      colorTheme={colorTheme}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    />
  );
}

export default SliderButton;
