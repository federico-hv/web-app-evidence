import googleLogo from '../assets/images/google-logo.png';
import spotifyLogo from '../assets/images/spotify-logo.png';
import appleLogo from '../assets/images/apple-logo.png';
import { IProviderItem, ProviderName } from './types';

export const Paths = {
  home: '',
  discover: 'discover',
  channels: 'channels',
  bookmarks: 'bookmarks',
  releases: 'releases',
  notifications: 'notifications',
  settings: 'settings',
  setting: {
    account: 'account',
    muted_notifications: 'muted_notifications',
    email_notifications: 'email_notifications',
    blocked_accounts: 'blocked_accounts',
    muted_accounts: 'muted_accounts',
    mute_and_block: 'mute_and_block',
    protection_and_tagging: 'protection',
    security: 'security_and_account_access',
    login_security: 'login_security',
    account_security: 'security',
    privacy: 'privacy_and_safety',
    notifications: 'notifications',
    account_info: 'account_info',
    change_password: 'change_password',
    connected_accounts: 'connected_accounts',
    notifications_filters: 'notifications/filters',
    notifications_preferences: 'notifications/preferences',
  },
  support: 'support',
  messages: 'messages',
  authRedirect: 'auth/redirect',
};

export const PathParams = {
  profileId: ':id',
};

export const Provider: Record<ProviderName, IProviderItem> = {
  google: {
    image: googleLogo,
    name: 'Google',
  },
  spotify: {
    image: spotifyLogo,
    name: 'Spotify',
  },
  apple: {
    image: appleLogo,
    name: 'Apple',
  },
};
