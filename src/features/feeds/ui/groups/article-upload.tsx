import { Fragment, useState } from 'react';
import { ConvertUrlForm, CreateArticleForm } from '../forms';

type ArticleUploadForms = 'manual' | 'url';

function ArticleUpload() {
  const [type, setType] = useState<ArticleUploadForms>('url');

  return (
    <Fragment>
      {type === 'url' && (
        <ConvertUrlForm onError={() => setType('manual')} />
      )}
      {type === 'manual' && <CreateArticleForm />}
    </Fragment>
  );
}

ArticleUpload.displayName = 'ArticleUpload';
export default ArticleUpload;
