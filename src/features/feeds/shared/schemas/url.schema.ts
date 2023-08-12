import { object, string } from 'yup';

const URLSchema = object({
  url: string().url('Enter valid url.').required('Enter url'),
});

export { URLSchema };
