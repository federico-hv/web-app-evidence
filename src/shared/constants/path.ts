import { Route } from 'react-router';
import { Box } from '@holdr-ui/react';

export const Paths = {
  root: '',
  all: 'all',
  discover: 'discover',
  clubs: 'clubs',
  channels: 'channels',
  connect: 'connect',
  bookmarks: 'bookmarks',
  allBookmarks: 'bookmarks/all',
  releases: 'releases',
  notifications: 'notifications',
  settings: 'settings',
  username: ':username',
  feed: 'feeds/:id',
  club: {
    watchlist: 'watchlist',
    memberships: 'memberships',
  },
  setupArtist: {
    uploadPhoto: 'upload-photos',
    aboutMeAndPerks: 'about-me-and-perks',
    socialMediaAccounts: 'social-media-accounts',
    connectOnboarding: 'connect-onboarding',
    customURL: 'custom-url',
  },
  setting: {
    account: 'account',
    username: 'username',
    email: 'email',
    phone: 'phone',
    country: 'country',
    birthday: 'birthday',
    gender: 'gender',
    backup_code: 'backup_code',
    muted_notifications: 'muted_notifications',
    email_notifications: 'email_notifications',
    blocked_accounts: 'blocked_accounts',
    muted_accounts: 'muted_accounts',
    restricted_accounts: 'restricted_accounts',
    manage_users: 'manage_users',
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
  setupFlow: 'setup/flow',
  setupProfile: 'setup/profile',
  artist: 'artist',
  general: 'general',
  messages: 'messages',
  authRedirect: 'auth-guard/auth-redirect',
};

export const RootSetting = {
  [Paths.setting.account]: Paths.setting.account,
  [Paths.setting.account_info]: Paths.setting.account,
  [Paths.setting.username]: Paths.setting.account,
  [Paths.setting.phone]: Paths.setting.account,
  [Paths.setting.email]: Paths.setting.account,
  [Paths.setting.country]: Paths.setting.account,
  [Paths.setting.gender]: Paths.setting.account,
  [Paths.setting.birthday]: Paths.setting.account,
  [Paths.setting.change_password]: Paths.setting.account,

  [Paths.setting.security]: Paths.setting.security,
  [Paths.setting.account_security]: Paths.setting.security,
  [Paths.setting.login_security]: Paths.setting.security,
  [Paths.setting.connected_accounts]: Paths.setting.security,

  [Paths.setting.privacy]: Paths.setting.privacy,
  [Paths.setting.protection_and_tagging]: Paths.setting.privacy,
  [Paths.setting.manage_users]: Paths.setting.privacy,
  [Paths.setting.blocked_accounts]: Paths.setting.privacy,
  [Paths.setting.muted_accounts]: Paths.setting.privacy,

  [Paths.setting.notifications]: Paths.setting.notifications,
  [Paths.setting.email_notifications]: Paths.setting.notifications,
  [Paths.setting.muted_notifications]: Paths.setting.notifications,
};

export const RootSettingsPath = `/${Paths.settings}/`;

export const PathParams = {
  profileId: ':id',
};
