import { IconButton } from '@holdr-ui/react';
import { IconButtonProps } from '@holdr-ui/react/dist/components/icon-button/src/icon-button.styles';

function SliderButton({
  icon = 'caret-left-outline',
  ariaLabel = 'decrement Slider',
  colorTheme = 'base100',
  style = { opacity: 0.75 },
  onClick,
  ...props
}: IconButtonProps) {
  return (
    <IconButton
      ariaLabel={ariaLabel}
      icon={icon}
      colorTheme={colorTheme}
      style={style}
      onClick={onClick}
      {...props}
    />
  );
}

export default SliderButton;
