import {
  VideoContextProvider,
  VideoControlsProps,
  VideoControlsSCNames,
  VideoIcons,
  VideoPausePlayProps,
  VideoPauseProps,
  VideoProgressSliderProps,
  VideoProps,
  VideoSCNames,
  VideoSettingsProps,
  VideoThumbnailProps,
  VideoVolumeProps,
  useVideoContext,
} from './shared';
import { Box, Center, HStack, Image, Text, VStack } from '@holdr-ui/react';
import { useState } from 'react';
import { VideoSlider } from './ui';
import { getSubComponent } from '../../utilities';

function Video({
  // playsInline,
  // autoPlay,
  // interactive,
  // volumeLevel,
  // speed,
  // src,
  w = 'full',
  h = 'full',
  children,
}: VideoProps) {
  const [paused, setPaused] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const togglePause = () => setPaused(!paused);
  const toggleMute = () => setMuted(!muted);
  const toggleFullscreen = () => setFullscreen(!fullscreen);

  const Pause = getSubComponent<VideoSCNames>(children, 'VideoPause');
  const Controls = getSubComponent<VideoSCNames>(
    children,
    'VideoControls',
  );
  const ProgressSlider = getSubComponent<VideoSCNames>(
    children,
    'VideoProgressSlider',
  );
  const Thumbnail = getSubComponent<VideoSCNames>(
    children,
    'VideoThumbnail',
  );

  return (
    <VideoContextProvider
      value={{
        paused,
        muted,
        fullscreen,
        togglePause,
        toggleMute,
        toggleFullscreen,
      }}
    >
      <Box
        w={w}
        h={h}
        bgColor='base600'
        css={{ userSelect: 'none' }}
        position='relative'
        zIndex={1000}
      >
        <Box w={w} h={h} onClick={togglePause}>
          {/* {Thumbnail} */}
          <Center w={w} h={h}>
            {Pause}
          </Center>
        </Box>
        <VStack
          px={5}
          pb={5}
          b={0}
          gap={5}
          w='full'
          h='fit-content'
          position='absolute'
        >
          <Center w='full' h='full'>
            {ProgressSlider}
          </Center>
          <Box w={w} h='15%'>
            {Controls}
          </Box>
        </VStack>
      </Box>
    </VideoContextProvider>
  );
}

function VideoThumbnail({
  children = <Box w='full' h='full' bgColor='base600' />,
}: VideoThumbnailProps) {
  return <>{children}</>;
}

function VideoProgressSlider({
  w = 'full',
  h = '4px',
}: VideoProgressSliderProps) {
  return (
    <HStack
      w={w}
      h={h}
      justify='space-between'
      _hover={{ cursor: 'pointer' }}
      items='center'
    >
      <VideoSlider />
      <Text color='base100'>0:09</Text>
    </HStack>
  );
}

function VideoPause({
  w = '15%',
  h = '20%',
  css,
  ...props
}: VideoPauseProps) {
  const { paused } = useVideoContext();
  return (
    <>
      {paused && (
        <Image
          src={VideoIcons.pauseIcon}
          w={w}
          h={h}
          css={{ ...css, ...{ opacity: 0.5 } }}
          {...props}
        />
      )}
    </>
  );
}

function VideoControls({
  justify = 'space-between',
  w = 'full',
  h = 'full',
  items = 'center',
  children,
}: VideoControlsProps) {
  const PausePlay = getSubComponent<VideoControlsSCNames>(
    children,
    'VideoPausePlay',
  );

  const Volume = getSubComponent<VideoControlsSCNames>(
    children,
    'VideoVolume',
  );

  const Settings = getSubComponent<VideoControlsSCNames>(
    children,
    'VideoSettings',
  );

  const FullScreen = getSubComponent<VideoControlsSCNames>(
    children,
    'VideoFullScreen',
  );

  return (
    <HStack justify={justify} w={w} h={h} items={items}>
      {PausePlay}
      <HStack gap={4}>
        {Volume}
        {Settings}
        {FullScreen}
      </HStack>
    </HStack>
  );
}

function VideoPausePlay({
  w = '20px',
  h = '20px',
  ...props
}: VideoPausePlayProps) {
  const { paused, togglePause } = useVideoContext();

  return (
    <Box w={w} h={h} onClick={togglePause} {...props}>
      <Image src={VideoIcons.play(paused)} />
    </Box>
  );
}

function VideoVolume({
  w = '20px',
  h = '20px',
  ...props
}: VideoVolumeProps) {
  const { muted, toggleMute } = useVideoContext();
  return (
    <Box w={w} h={h} onClick={toggleMute} {...props}>
      <Image src={VideoIcons.volume(muted)} />
    </Box>
  );
}

function VideoSettings({
  w = '20px',
  h = '20px',
  ...props
}: VideoSettingsProps) {
  return (
    <Box w={w} h={h} {...props}>
      <Image src={VideoIcons.settingsIcon} />
    </Box>
  );
}

function VideoFullScreen({
  w = '20px',
  h = '20px',
  ...props
}: VideoSettingsProps) {
  const { fullscreen, toggleFullscreen } = useVideoContext();
  return (
    <Box w={w} h={h} {...props} onClick={toggleFullscreen} {...props}>
      <Image src={VideoIcons.fullscreen(fullscreen)} />
    </Box>
  );
}

Video.displayName = 'Video';
VideoPause.displayName = 'VideoPause';
VideoVolume.displayName = 'VideoVolume';
VideoSettings.displayName = 'VideoSettings';
VideoControls.displayName = 'VideoControls';
VideoThumbnail.displayName = 'VideoThumbnail';
VideoPausePlay.displayName = 'VideoPausePlay';
VideoFullScreen.displayName = 'VideoFullScreen';
VideoProgressSlider.displayName = 'VideoProgressSlider';

Video.Pause = VideoPause;
Video.Thumbnail = VideoThumbnail;
Video.Controls = VideoControls;
Video.ProgressSlider = VideoProgressSlider;
VideoControls.Volume = VideoVolume;
VideoControls.Settings = VideoSettings;
VideoControls.PausePlay = VideoPausePlay;
VideoControls.FullScreen = VideoFullScreen;

export default Video;

export {
  VideoProgressSlider,
  VideoThumbnail,
  VideoPause,
  VideoControls,
  VideoPausePlay,
  VideoVolume,
  VideoSettings,
  VideoFullScreen,
};
