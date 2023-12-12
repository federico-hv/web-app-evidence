import { Fragment, useState } from 'react';
import { ConvertUrlForm, CreateArticleForm } from '../forms';
import { ProcessActionType } from 'shared';
import { Button, VStack } from '@holdr-ui/react';

function ArticleUpload() {
  const [manual, setManual] = useState<ProcessActionType>('auto');

  return (
    <Fragment>
      {manual === 'auto' && (
        <VStack>
          <ConvertUrlForm />
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setManual('manual')}
          >
            {`Can't use Link?`}
          </Button>
        </VStack>
      )}
      {manual === 'manual' && <CreateArticleForm />}
    </Fragment>
  );
}

ArticleUpload.displayName = 'ArticleUpload';
export default ArticleUpload;
