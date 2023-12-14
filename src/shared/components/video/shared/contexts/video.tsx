import { createContext, useContext } from 'react';
import { IVideoContext } from '../types';
import { dummyFn } from 'shared';

const VideoContext = createContext<IVideoContext>({
  paused: false,
  muted: false,
  fullscreen: false,
  togglePause: dummyFn,
  toggleMute: dummyFn,
  toggleFullscreen: dummyFn,
});

const VideoContextProvider = VideoContext.Provider;

function useVideoContext() {
  return useContext(VideoContext);
}

export { useVideoContext, VideoContextProvider };
