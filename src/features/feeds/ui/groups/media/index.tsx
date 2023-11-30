import { Fragment, useEffect, useState } from 'react';
import {
  MediaItem,
  MediaView,
  MediaViewContent,
} from '../../../../../shared';
import { PostMediaProps } from './types';
import { useDisclosure } from '@holdr-ui/react';
import { Slider } from 'shared';

function PostMedia({ items }: PostMediaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slideIndex, setIndex] = useState(0);

  const SliderControls = (
    <Slider.Controls>
      <Slider.Controls.NextButton zIndex={50} />
      <Slider.Controls.PreviousButton zIndex={50} />
    </Slider.Controls>
  );

  // change if single video post support is changed
  if (items[0].type === 'video')
    return <MediaItem type={items[0].type} url={items[0].url} />;

  return (
    <Fragment>
      <MediaView isOpen={isOpen} onClose={onClose}>
        <MediaViewContent>
          <MediaView.Slider
            w='100%'
            h='100%'
            current={slideIndex}
            animation='slide'
            keyboard
          >
            <Slider.Content>
              {items.map((el, idx) => (
                <Slider.Slide
                  key={`media-slide-${idx}`}
                  radius={4}
                  overflow='hidden'
                >
                  <MediaItem type={el.type} url={el.url} />
                </Slider.Slide>
              ))}
            </Slider.Content>
            {SliderControls}
            <Slider.Indicator pb={3} zIndex={50} />
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
        {SliderControls}
        <Slider.Indicator pb={3} />
      </Slider>
    </Fragment>
  );
}
PostMedia.displayName = 'PostMedia';

export default PostMedia;
