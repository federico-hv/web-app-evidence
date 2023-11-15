import { ButtonGroup, Center, IconButton } from '@holdr-ui/react';
import { SliderButtonsProps } from '../../shared';

function SliderButtons({
  incrementCurrent,
  decrementCurrent,
}: SliderButtonsProps) {
  return (
    <Center position='absolute' t='50%' b='50%' w='full'>
      <ButtonGroup
        style={{ opacity: 0.75, visibility: 'hidden' }}
        size='lg'
        justify='space-between'
        w='full'
        colorTheme='base100'
      >
        <IconButton
          icon='caret-left-outline'
          ariaLabel='decrement Slider'
          onClick={decrementCurrent}
          style={{ visibility: 'visible' }}
        />
        <IconButton
          icon='caret-right-outline'
          ariaLabel='increment Slider'
          onClick={incrementCurrent}
          style={{ visibility: 'visible' }}
        />
      </ButtonGroup>
    </Center>
  );
}

SliderButtons.displayName = 'SliderButtons';
export default SliderButtons;
