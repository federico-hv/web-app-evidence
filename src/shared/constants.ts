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
    username: 'username',
    email: 'email',
    phone: 'phone',
    country: 'country',
    birthday: 'birthday',
    gender: 'gender',
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

export const Age = {
  min: 18,
  max: 75,
};

export const usernamePattern = '^[a-zA-Z0-9_]*$';
export const phonePattern =
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$';
export const usernamePatternMsg =
  'Username must only contain letters, numbers and underscores';
export const phonePatternMsg =
  'Phone must only contain a valid phone number';
export const passwordPattern =
  '(?=.{10,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*';
export const emailPatternMsg = 'Enter a valid email address';
export const passwordPatternMsg =
  'Password must have at least 1 special character (@#$%^&+=) and at least 1 number';
export const passwordMismatch = 'Must match password';
export const minimumAgeMsg = 'You are required to be 18 years or older';
export const maximumAgeMsg = 'Please enter an appropriate date.';
