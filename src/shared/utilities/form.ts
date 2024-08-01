import { FormikErrors } from 'formik';
import { matchesPattern } from './string';
import { StringNumeric } from '@holdr-ui/react';
import {
  ICompareErrorExists,
  ILengthErrorExists,
  PasswordErrors,
} from '../types';
import { FieldLengths } from '../constants';
import { isUndefined } from 'lodash';

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

function enumerable(item: any) {
  try {
    return !!item.length;
  } catch (e) {
    return false;
  }
}

/**
 * Check whether fields are missing from a form's data.
 *
 * @param data The form data to check.
 * @param omit The fields to omit from being checked.
 *
 * @returns true if the data has any field that is empty.
 */
export function missingField<T extends Record<string, any>>(
  data: T,
  omit: string[] = [],
) {
  const keys = Object.keys(data);

  for (const key of keys) {
    if (!data[key] || data[key] === undefined) {
      return true;
    }

    if (!enumerable(data[key])) {
      return true;
    }

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
 * Check if an object has key values that
 * are all undefined
 *
 * @param data the object to check.
 */
export function hasAllUndefinedKeyValues(data: any) {
  const keys = Object.keys(data);

  for (const key of keys) {
    if (!isUndefined(data[key])) {
      return false;
    }
  }

  return true;
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

/**
 * Useful for checking input field errors
 *
 * @param value
 * @param options
 */
export function handleFieldError(
  value: string | undefined,
  options: {
    keyName: string;
    pattern?: { value: RegExp; message?: string };
    min?: ILengthErrorExists;
    max?: ILengthErrorExists;
    compare?: ICompareErrorExists;
    same?: { value: string; refName: string; message?: string };
  },
) {
  if (!value) {
    return;
  }

  const errorMessageGenerator = {
    min: (value: number) => `must be at least ${value} characters long.`,
    max: (value: number) => `must be at most ${value} characters long.`,
    pattern: (pattern: RegExp) => `must match the pattern ${pattern}`,
    same: (refName: string) => `must match ${refName}`,
    gt: (value: StringNumeric) => `must be greater than ${value}.`,
    lt: (value: StringNumeric) => `must be less than ${value}.`,
  };

  const constructError = (message: string) =>
    `${options.keyName} ${message}`;

  if (options.pattern && value.length > 0) {
    const errorMessage = matchesPattern(value, options.pattern.value)
      ? undefined
      : options.pattern.message ||
        constructError(
          errorMessageGenerator.pattern(options.pattern.value),
        );

    if (errorMessage) return errorMessage;
  }
  if (options.min && value.length > 0) {
    const errorMessage =
      value.length >= options.min.length
        ? undefined
        : options.min.message ||
          constructError(errorMessageGenerator.min(options.min.length));

    if (errorMessage) return errorMessage;
  }
  if (options.max && value.length > 0) {
    const errorMessage =
      value.length <= options.max.length
        ? undefined
        : options.max.message ||
          constructError(errorMessageGenerator.max(options.max.length));

    if (errorMessage) return errorMessage;
  }
  if (options.same && value.length > 0) {
    const errorMessage =
      value === options.same.value
        ? undefined
        : options.same.message ||
          constructError(errorMessageGenerator.same(options.same.refName));

    if (errorMessage) return errorMessage;
  }
  if (options.compare && value) {
    if (options.compare.fn !== undefined) {
      const errorMessage = options.compare.fn
        ? options.compare.message?.fn
        : undefined;

      if (errorMessage) return errorMessage;
    }
    if (options.compare.gt !== undefined) {
      const errorMessage =
        options.compare.value > options.compare.gt
          ? undefined
          : options.compare.message?.gt ||
            constructError(errorMessageGenerator.gt(options.compare.gt));

      if (errorMessage) return errorMessage;
    }
    if (options.compare.lt !== undefined) {
      const errorMessage =
        options.compare.value < options.compare.lt
          ? undefined
          : options.compare.message?.lt ||
            constructError(errorMessageGenerator.lt(options.compare.lt));

      if (errorMessage) return errorMessage;
    }
  }

  return undefined;
}

export function passwordValidation(password: string) {
  let errors: PasswordErrors = {
    capital: undefined,
    lowercase: undefined,
    special: undefined,
    number: undefined,
    length: undefined,
  };

  if (matchesPattern(password, /[A-Z]/)) {
    errors = { ...errors, capital: false };
  } else {
    errors = { ...errors, capital: true };
  }
  if (matchesPattern(password, /[a-z]/)) {
    errors = { ...errors, lowercase: false };
  } else {
    errors = { ...errors, lowercase: true };
  }
  if (matchesPattern(password, /[0-9]/)) {
    errors = { ...errors, number: false };
  } else {
    errors = { ...errors, number: true };
  }
  if (matchesPattern(password, /[\W]/)) {
    errors = { ...errors, special: false };
  } else {
    errors = { ...errors, special: true };
  }
  if (password.length >= FieldLengths.password.min) {
    errors = { ...errors, length: false };
  } else {
    errors = { ...errors, length: true };
  }

  return errors;
}
