import { Helmet } from 'react-helmet';
import { HeadProps } from './head.types';

function Head({ title, description }: HeadProps) {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>Holdr Base - {title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
}
Head.displayName = 'Head';
export default Head;
