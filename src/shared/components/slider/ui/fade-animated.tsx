import React, { Fragment } from 'react';
import { GenericProps } from '../../../interfaces';
import { HStack } from '@holdr-ui/react';
import { useSliderContext } from '../shared';
import { MotionBox } from '../../../styles';
import { getSubComponent, makeArray } from '../../../utilities';

/**
 * TODO:
 * - Fix animation
 * - Idea: Stack the content on top of each other
 *    then as one of the items goes off, its put at the end of the list
 *    and the next item appear from the bottom.
 */

function FadeAnimated({ children }: GenericProps) {
  const { index, numberOfSlides } = useSliderContext();

  const FadeAnimatedSlides = getSubComponent(
    children,
    'FadeAnimatedSlides',
  );
  const FadeAnimatedControls = getSubComponent(
    children,
    'FadeAnimatedControls',
  );

  const Percentage = 100 / numberOfSlides;

  // Add extra styling for slides
  const Slides = React.Children.map(
    makeArray(FadeAnimatedSlides)[0].props.children,
    (child, idx) => {
      const active = idx === index.current;
      return (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          hidden={!active}
          position='absolute'
          t={0}
          l={0}
          h='full'
          w='full'
          css={{ flex: 1, flexShrink: 0, flexBasis: `${Percentage}%` }}
        >
          {child}
        </MotionBox>
      );
    },
  );

  return (
    <Fragment>
      <HStack
        h='100%'
        w={`${numberOfSlides * 100}%`}
        css={{
          flexShrink: 0,
        }}
      >
        {Slides}
      </HStack>
      {FadeAnimatedControls}
    </Fragment>
  );
}
FadeAnimated.displayName = 'FadeAnimated';

function FadeAnimatedSlides({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
function FadeAnimatedControls({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}

FadeAnimatedSlides.displayName = 'FadeAnimatedSlides';
FadeAnimatedControls.displayName = 'FadeAnimatedControls';

FadeAnimated.Controls = FadeAnimatedControls;
FadeAnimated.Slides = FadeAnimatedSlides;

export default FadeAnimated;
