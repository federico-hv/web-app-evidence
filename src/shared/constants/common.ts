export const KeyboardKey = {
  Escape: 27,
  LeftArrow: 37,
  RightArrow: 39,
};

export const SocialProviderArr = ['Instagram', 'X', 'TikTok'];

export const socialProvider = ['Instagram', 'X', 'TikTok'] as const;

export const MaxFieldLength = {
  FanProfile: {
    Bio: 250,
  },
};

export enum ExternalLinkTypeEnum {
  'Merch' = 'Merch',
  'Event' = 'Event',
  'Other' = 'Other',
}

export const ErrorMessage = {
  Any: 'Oops, something went wrong. Try again later.',
};

export const FieldLengths = {
  username: {
    min: 3,
    max: 25,
  },
  url: {
    max: 15,
  },
  password: {
    min: 10,
    max: 25,
  },
  location: {
    min: null,
    max: 50,
  },
  collaborator: {
    min: 3,
    max: 75,
  },
  name: {
    min: 3,
    max: null,
  },
  displayName: {
    min: 3,
    max: 50,
  },
  bio: {
    max: 500,
  },
};

export const MinAge = 16;
