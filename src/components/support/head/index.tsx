import { Helmet } from 'react-helmet';
import { HeadProps } from './head.types';
import { prefix } from 'utilities';

function Head({ title, description, image, url }: HeadProps) {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>Holdr Base - {title}</title>
      <meta name='description' content={description} />

      <meta name='og:title' content={title} />
      <meta name='og:description' content={title} />
      {image && <meta name='og:image' content={image} />}
      {url && (
        <meta
          name='og:url'
          content={prefix(import.meta.env.VITE_APP_BASE_URL, url)}
        />
      )}
    </Helmet>
  );
}
Head.displayName = 'Head';
export default Head;
