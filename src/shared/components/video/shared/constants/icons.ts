import expand from '../assets/expand.png';
import minimize from '../assets/minimize.png';
import mute from '../assets/mute.png';
import pause from '../assets/pause.png';
import play from '../assets/play.png';
import settings from '../assets/settings.png';
import speedSettings from '../assets/speed-settings.png';
import volume from '../assets/volume.png';

export const VideoIcons = {
  play: (active: boolean) => (active ? pause : play),
  volume: (active: boolean) => (active ? mute : volume),
  fullscreen: (active: boolean) => (active ? minimize : expand),
  playIcon: play,
  pauseIcon: pause,
  settingsIcon: settings,
  speedSettingsIcon: speedSettings,
};
