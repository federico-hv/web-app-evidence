import { GenericProps } from '../../interfaces';
import { FormikHelpers } from 'formik/dist/types';

export interface FormProps<Values> extends GenericProps {
  initialValues: Values;
  validationSchema?: any | (() => any);
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => void | Promise<any>;
}
