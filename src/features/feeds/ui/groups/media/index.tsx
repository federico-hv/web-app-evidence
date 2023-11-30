import { Fragment, useEffect, useState } from 'react';
import {
  MediaItem,
  MediaView,
  MediaViewContent,
} from '../../../../../shared';
import { PostMediaProps } from './types';
import { Box, useDisclosure } from '@holdr-ui/react';
import { Slider } from 'shared';
import { IndicatorDot } from '../../../../../shared/components/slider/ui';

function PostMedia({ items }: PostMediaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slideIndex, setIndex] = useState(0);

  // change if single video post support is changed
  if (items[0].type === 'video')
    return (
      <Box mt={5}>
        <MediaItem type={items[0].type} url={items[0].url} />;
      </Box>
    );

  return (
    <Fragment>
      <MediaView isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <MediaViewContent>
          <MediaView.Slider
            current={slideIndex}
            animation='slide'
            keyboard
            w='full'
            h='full'
          >
            <Slider.Content>
              {items.map((el, idx) => (
                <Slider.Slide
                  key={`media-slide-${idx}`}
                  radius={4}
                  overflow='hidden'
                  w='full'
                  h='full'
                >
                  <Box w='85%' h='full'>
                    <MediaItem type={el.type} url={el.url} />
                  </Box>
                </Slider.Slide>
              ))}
            </Slider.Content>
            <Slider.Controls>
              <Slider.Controls.NextButton zIndex={50} size='lg' />
              <Slider.Controls.PreviousButton zIndex={50} size='lg' />
            </Slider.Controls>
            <Slider.Indicator
              pb={3}
              zIndex={50}
              renderItem={(isActive, onClick, key) => (
                <IndicatorDot
                  isActive={isActive}
                  onClick={onClick}
                  key={key}
                  size='0.8rem'
                />
              )}
            />
          </MediaView.Slider>
        </MediaViewContent>
      </MediaView>
      <Slider
        mt={5}
        h={{ '@bp1': 250, '@bp3': 350 }}
        zIndex={5}
        speed='duration-faster'
        animation='slide'
      >
        <Slider.Content>
          {items.map((el, idx) => (
            <Slider.Slide
              key={`media-slide-${idx}`}
              onClick={() => {
                setIndex(idx);
                onOpen();
              }}
            >
              <MediaItem type={el.type} url={el.url} />
            </Slider.Slide>
          ))}
        </Slider.Content>

        <Slider.Controls>
          <Slider.Controls.NextButton zIndex={50} />
          <Slider.Controls.PreviousButton zIndex={50} />
        </Slider.Controls>
        <Slider.Indicator pb={3} />
      </Slider>
    </Fragment>
  );
}
PostMedia.displayName = 'PostMedia';

export default PostMedia;
