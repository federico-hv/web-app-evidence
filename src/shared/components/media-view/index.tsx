import { GenericProps } from '../../interfaces';
import { AvatarProps } from '@holdr-ui/react/dist/components/avatar/src/avatar.types';
import {
  Avatar,
  Box,
  CloseButton,
  Image,
  useDisclosure,
  useKeyBind,
  useNoScroll,
  VStack,
} from '@holdr-ui/react';
import { ImageProps } from '@holdr-ui/react/dist/components/image/src/image.types';
import { getSubComponent } from '../../utilities';
import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { MediaViewSCNames } from './type';

/*
  Anatomy:
  <MediaDialog>
    <MediaTrigger/>
    <MediaContent>
      <MediaAvatar/>
      <MediaImage/>
    </MediaContent>
  </MediaDialog>
*/

function MediaView({ children }: GenericProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Trigger = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewTrigger',
  );
  const Content = getSubComponent<MediaViewSCNames>(
    children,
    'MediaViewContent',
  );

  // cannot scroll
  useNoScroll();
  // close with ESCAPE
  useKeyBind(27, onClose);

  return (
    <Fragment>
      <Box w='100%' h='100%' onClick={onOpen}>
        {Trigger}
      </Box>
      {createPortal(
        <Fragment>
          {isOpen && (
            <AnimatePresence>
              <Box
                position='fixed'
                w='w-screen'
                h='h-screen'
                t={0}
                l={0}
                zIndex={100}
              >
                <Box position='relative' w='100%' h='100%'>
                  <Box
                    position='absolute'
                    t='1rem'
                    l='1rem'
                    css={{ zIndex: 51 }}
                  >
                    <CloseButton
                      onClick={onClose}
                      size={{ '@bp1': 'base', '@bp3': 'lg' }}
                    />
                  </Box>
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
                    justify='center'
                  >
                    {Content}
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
  return <Image {...props} />;
}
MediaViewImage.displayName = 'MediaViewImage';

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

  return (
    <Fragment>
      {Avatar}
      {Image}
    </Fragment>
  );
}
MediaViewContent.displayName = 'MediaViewContent';

MediaView.Trigger = MediaViewTrigger;
MediaView.Image = MediaViewImage;
MediaView.Avatar = MediaViewAvatar;
MediaView.Content = MediaViewContent;

function MediaViewTrigger({ children }: GenericProps) {
  return <Fragment>{children}</Fragment>;
}

MediaViewTrigger.displayName = 'MediaViewTrigger';

export {
  MediaViewTrigger,
  MediaViewImage,
  MediaViewAvatar,
  MediaViewContent,
};

export default MediaView;
