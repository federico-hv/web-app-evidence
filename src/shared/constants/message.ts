export const usernamePattern = '^[a-zA-Z0-9_]*$';
export const phonePattern =
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$';
export const usernamePatternMsg =
  'Username must only contain letters, numbers and underscores';
export const phonePatternMsg =
  'Phone must only contain a valid phone-input number';
export const passwordPattern =
  '(?=.{10,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*';
export const emailPatternMsg = 'Enter a valid email address';
export const passwordPatternMsg =
  'Password must have at least 1 special character (@#$%^&+=) and at least 1 number';
export const passwordMismatch = 'Must match account-info-guard';
export const minimumAgeMsg = 'You are required to be 18 years or older';
export const maximumAgeMsg = 'Please enter an appropriate date.';
