import { StringNumeric } from '../shared';
import { FormikErrors } from 'formik';

export const minimumLengthMsg = (min: number) =>
  `Requires ${min} characters or more`;

export const maximumLengthMsg = (min: number) =>
  `Requires ${min} characters less more`;

export const requiredField = (field: string) => `Enter your ${field}`;

export function isInputDisabled<T extends StringNumeric, U>(
  values: Record<T, any>,
  errors: FormikErrors<U>,
  keys: Array<any>,
) {
  if (!keys) {
    return false;
  }

  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!values[key]) {
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
