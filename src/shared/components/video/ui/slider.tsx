import * as Slider from '@radix-ui/react-slider';
import { styled } from 'configs';
import { VideoSliderCommonProps } from '../shared';
import { Box } from '@holdr-ui/react';

function VideoSlider({
  primaryColor = '$secondary300',
  secondaryColor = '$base700',
}: VideoSliderCommonProps) {
  const SliderRoot = styled(Slider.Root, {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: '$full',
    height: '$full',
  });

  const SliderTrack = styled(Slider.Track, {
    backgroundColor: secondaryColor,
    position: 'relative',
    flexGrow: '1',
    height: '100%',
  });

  const SliderRange = styled(Slider.Range, {
    backgroundColor: primaryColor,
    position: 'absolute',
    height: '100%',
  });

  return (
    <Box w='90%' h='full'>
      <SliderRoot>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
      </SliderRoot>
    </Box>
  );
}

VideoSlider.displayName = 'VideoSlider';

export default VideoSlider;
