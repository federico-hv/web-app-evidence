export const URLPattern =
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-z]{2,}(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?$/;

export const Patterns = {
  URL: /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-z]{2,}(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?$/,
  InstagramURL: /^https:\/\/(www\.)?instagram.com\/.+/,
  TikTokURL: /^https:\/\/(www\.)?tiktok.com\/.+/,
  XURL: /^https:\/\/(www\.)?(x|twitter).com\/.+/,
  Password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})$/,
  Username: /^[a-zA-Z0-9_]*$/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  Integer: /^[0-9]+$/,
};
