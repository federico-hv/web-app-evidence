import { FormikErrors } from 'formik';

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
