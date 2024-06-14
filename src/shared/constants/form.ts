export const URLPattern =
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-z]{2,}(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?$/;

export const Patterns = {
  URL: /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-z]{2,}(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?$/,
  Username: /^[a-zA-Z0-9_]*$/,
  InstagramURL: /^https:\/\/(www\.)?instagram.com\/.+/,
  TikTokURL: /^https:\/\/(www\.)?tiktok.com\/.+/,
  XURL: /^https:\/\/(www\.)?(x|twitter).com\/.+/,
};
