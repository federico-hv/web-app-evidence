import { TemplateUtilityFn } from './template-utility.type';

/**
 * A stub for a utility fn used across the project.
 *
 * @param param A general parameter
 *
 * @returns nothing
 */
export const templateUtility: TemplateUtilityFn = (param) => {
  console.log(param);

  return true;
};
