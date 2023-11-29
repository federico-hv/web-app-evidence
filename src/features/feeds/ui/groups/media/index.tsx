import { Fragment, cloneElement, useEffect, useState } from 'react';
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

  const MediaItems = items.map((el, idx) => (
    <Slider.Slide key={`media-slide-${idx}`}>
      <MediaItem type={el.type} url={el.url} />
    </Slider.Slide>
  ));

  return (
    <Fragment>
      <MediaView isOpen={isOpen} onClose={onClose}>
        <MediaViewContent>
          <MediaView.Slider w='100%' h='100%' current={slideIndex}>
            <Slider.Content>{MediaItems}</Slider.Content>
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
          {MediaItems.map((el, idx) =>
            cloneElement(el, {
              onClick: () => {
                setIndex(idx);
                onOpen();
              },
            }),
          )}
        </Slider.Content>
        {SliderControls}
        <Slider.Indicator pb={3} />
      </Slider>
    </Fragment>
  );
}
PostMedia.displayName = 'PostMedia';

export default PostMedia;
