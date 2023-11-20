import {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useSliderContext } from '../contexts';
import { Box, HStack } from '@holdr-ui/react';
import { useAnimationControls } from 'framer-motion';
import { MotionBox } from 'shared';

export function SlideContent({ children }: { children: ReactNode }) {
  const {
    current: currentSlide,
    length,
    direction: directionClicked,
    speed,
    buttonClicked,
    setButtonClicked,
  } = useSliderContext();

  const [displayedSlide, setDisplayedSlide] = useState(0);
  const animations = useAnimationControls();
  animations.mount();

  const [SlideList, setSlideList] = useState<ReactElement[]>(
    Children.map(children, (child, idx) => (
      <Fragment key={idx}>{child}</Fragment>
    ))?.reduce((slides, slide, idx) => {
      return idx <= length / 2 ? [...slides, slide] : [slide, ...slides];
    }, [] as ReactElement[]) || [],
  );

  useEffect(() => {
    console.log(SlideList);
  }, [SlideList]);

  const slideSlides = async (direction: 'left' | 'right') => {
    await animations
      .start(() => {
        return {
          x: direction === 'left' ? '100%' : '-100%',
          transition: {
            duration: speed,
          },
        };
      })
      .then(() => {
        updateSlideList(direction, 1);
        animations.start(() => {
          return {
            x: '0',
            transition: {
              duration: 0,
            },
          };
        });
      });
  };

  const updateSlideList = (direction: 'left' | 'right', times: number) => {
    direction === 'left'
      ? setSlideList([
          ...SlideList.slice(length - times),
          ...SlideList.slice(0, length - times),
        ])
      : setSlideList([
          ...SlideList.slice(times),
          ...SlideList.slice(0, times),
        ]);
  };

  useEffect(() => {
    if (displayedSlide === currentSlide) return;

    // TODO: fix,
    if (!buttonClicked) {
      const difference = displayedSlide - currentSlide;
      updateSlideList(
        difference > 0 ? 'left' : 'right',
        Math.abs(difference),
      );
      return;
    }

    slideSlides(directionClicked).then(() => {
      setDisplayedSlide(currentSlide);
      setButtonClicked(false);
    });
  }, [currentSlide]);

  return (
    <Box h='full' w='calc(100% - 32px)' radius={3}>
      <MotionBox w='full' h='full' animate={animations}>
        <HStack
          // UPDATE THIS
          l={'-100%'}
          h='full'
          w={`${100 * length}%`}
          position='absolute'
        >
          {SlideList}
        </HStack>
      </MotionBox>
    </Box>
  );
}

export default SlideContent;
