import { GenericProps } from '../../interfaces';
import {
  Avatar,
  Box,
  Button,
  Image,
  useDisclosure,
  useKeyBind,
  useNoScroll,
  VStack,
} from '@holdr-ui/react';
import { dummyFn, getSubComponent } from '../../utilities';
import { Fragment, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { MediaViewProps, MediaViewSCNames } from './type';
import { extraBtnPadding } from '../../styles';

import { ImageProps } from '@holdr-ui/react/dist/components/image/src/image.types';
import { AvatarProps } from '@holdr-ui/react/dist/components/avatar/src/avatar.types';
import { SliderProps } from '../slider/shared';
import Slider from '../slider';

/*
  Anatomy:
  <MediaDialog>
    <MediaTrigger/>
    <MediaContent>
      <MediaAvatar/>
      <MediaImage/>
      <MediaSlider/>
    </MediaContent>
  </MediaDialog>
*/

function MediaView({
  children,
  isOpen: _isOpen,
  onOpen: _onOpen,
  onClose: _onClose,
}: MediaViewProps) {
  let { isOpen, onOpen, onClose } = useDisclosure();

  // the following assumes you define your props in a way that once a dev
  // wants to set isOpen externally they must also set onOpen and onClose
  if (_isOpen && _onOpen && _onClose) {
    isOpen = _isOpen;
    onOpen = _onOpen;
    onClose = _onClose;
  }

  const Trigger = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewTrigger',
  );
  const Content = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewContent',
  );

  useNoScroll(isOpen);
  // close with ESCAPE
  useKeyBind(27, onClose);

  return (
    <Fragment>
      {Trigger && (
        <Box w='100%' h='100%' onClick={onOpen}>
          {Trigger}
        </Box>
      )}
      {createPortal(
        <Fragment>
          {isOpen && (
            <AnimatePresence>
              <Box
                position='fixed'
                w='100%'
                h='100%'
                t={0}
                l={0}
                zIndex={100}
              >
                <Box position='relative' w='100%' h='100%'>
                  <Box // Overlay
                    position='absolute'
                    l={0}
                    t={0}
                    w='100%'
                    h='100%'
                    bgColor='darkTint400'
                    css={{
                      blur: '12px',
                    }}
                  />
                  <Box // Overlay for closing -- Hack for image hack SMH (See centered image hack in shared/styles)
                    position='absolute'
                    l={0}
                    t={0}
                    w='100%'
                    h='100%'
                    onClick={onClose}
                    zIndex={50}
                  />
                  <VStack
                    h='100%'
                    w='100%'
                    items='center'
                    gap={4}
                    justify='space-between'
                    p={{ '@bp1': 3, '@bp4': 4 }}
                  >
                    <Box />
                    {Content}
                    <Box position='relative' zIndex={50}>
                      <Button
                        onClick={onClose}
                        className={extraBtnPadding()}
                        colorTheme='primary400'
                        variant='ghost'
                      >
                        Close
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </AnimatePresence>
          )}
        </Fragment>,
        document.querySelector('#root') || document.body,
      )}
    </Fragment>
  );
}
MediaView.displayName = 'MediaView';

function MediaViewAvatar(props: AvatarProps) {
  return <Avatar {...props} />;
}
MediaViewAvatar.displayName = 'MediaViewAvatar';

function MediaViewImage(props: ImageProps) {
  return <Image {...props} radius={3} />;
}
MediaViewImage.displayName = 'MediaViewImage';

function MediaViewSlider(props: SliderProps) {
  return <Slider {...props} />;
}
MediaViewSlider.displayName = 'MediaViewSlider';

function MediaViewTrigger({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}
MediaViewTrigger.displayName = 'MediaViewTrigger';

function MediaViewContent({ children }: GenericProps) {
  if (children && Array.isArray(children) && children.length > 1) {
    throw new Error(
      '[MediaViewContent]: Too many children. Only accepts one child. ',
    );
  }

  const Avatar = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewAvatar',
  );
  const Image = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewImage',
  );
  const Slider = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewSlider',
  );

  return (
    <Fragment>
      {Avatar}
      {Image}
      {Slider}
    </Fragment>
  );
}

MediaViewContent.displayName = 'MediaViewContent';

MediaView.Trigger = MediaViewTrigger;
MediaView.Image = MediaViewImage;
MediaView.Avatar = MediaViewAvatar;
MediaView.Slider = MediaViewSlider;
MediaView.Content = MediaViewContent;

export {
  MediaViewTrigger,
  MediaViewImage,
  MediaViewAvatar,
  MediaViewSlider,
  MediaViewContent,
};

export default MediaView;
