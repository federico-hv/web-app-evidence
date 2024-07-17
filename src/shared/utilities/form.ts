import { FormikErrors } from 'formik';
import { matchesPattern } from './string';

export const minimumLengthMsg = (min: number) =>
  `Requires ${min} characters or more`;

export const maximumLengthMsg = (max: number) =>
  `Requires ${max} characters less more`;

export const requiredField = (field: string, subject = 'your') =>
  `Enter ${subject} ${field}`;

export function isInputDisabled<U>(
  values: Record<any, any>,
  errors: FormikErrors<U>,
  keys: Array<any>,
) {
  if (!keys) {
    return false;
  }

  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (values[key] === undefined) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (values[key].length === 0 || Object.keys(errors).includes(key)) {
      return true;
    }
  }
  return false;
}

/**
 * Check whether fields are missing from a form's data.
 *
 * @param data The form data to check.
 * @param omit The fields to omit from being checked.
 *
 * @returns true if the data has any field that is empty.
 */
export function missingField<T extends Record<string, string>>(
  data: T,
  omit: string[],
) {
  const keys = Object.keys(data);

  for (const key of keys) {
    if (omit.includes(key)) {
      continue;
    }
    if (data[key].length === 0) {
      return true;
    }
  }

  return false;
}

/**
 * Construct a message when an invalid pattern is encountered
 */
export const PatternErrorMessage = {
  invalid: (value = 'value') => `Enter a valid ${value}`,
  invalidCharacters: (value = 'Value', expecting?: string) =>
    `${value} contains invalid characters. ${
      expecting ? `Expecting ${expecting}.` : ''
    }`,
};

/**
 * Check whether a value matches a regex pattern
 *
 * @param value the value to match
 * @param pattern the regex pattern
 * @param message the message to display
 */
export function isMatchingPattern(
  value: string | undefined,
  pattern: RegExp,
  message = PatternErrorMessage.invalid(),
): string | undefined {
  if (value === undefined || value.length === 0) return undefined;

  return matchesPattern(value, pattern) ? undefined : message;
}
