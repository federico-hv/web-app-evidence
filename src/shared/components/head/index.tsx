import { Helmet } from 'react-helmet-async';
import { HeadProps } from './types';
import { prefix, useScrollToWindowTop } from '../../index';

function Head({
  title,
  prefix: prefixStr = 'Holdr -',
  description,
  image,
  url,
}: HeadProps) {
  useScrollToWindowTop();

  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>
        {prefixStr} {title}
      </title>
      <meta name='description' content={description} />
      <link rel='icon' type='image/png' href='/logo-dark.png' />
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
