import {
  CreateArticleInput,
  useCreateArticle,
  useCreateOgMetadata,
} from '../../../../../shared';
import { Button } from '@holdr-ui/react';
import {
  makeButtonLarger,
  useStepperContext,
} from '../../../../../../../shared';
import { useCreateFeedContext } from '../../context';
import { Fragment } from 'react';
import { defaultArticleState } from '../../constants';

function CreateArticleButton() {
  const { createArticle, loading: loadingCreateArticle } =
    useCreateArticle();
  const { createOgMetadata, loading: loadingCreateOgMetadata } =
    useCreateOgMetadata();
  const {
    badLink,
    articleState,
    websiteUrl,
    resetWebsiteUrl,
    updateArticleState,
    close,
  } = useCreateFeedContext();

  const { currentStep, increment } = useStepperContext();
  return (
    <Fragment>
      {currentStep === 1 && (
        <Button
          isLoading={loadingCreateOgMetadata}
          loadingText={loadingCreateOgMetadata ? '' : 'Posting'}
          onClick={async () => {
            if (!badLink) {
              const result = await createOgMetadata(websiteUrl);

              if (result) {
                resetWebsiteUrl();

                updateArticleState({
                  title: result.title.replace(/<\/?[^>]+(>|$)/g, ''),
                  description: result.description.replace(
                    /<\/?[^>]+(>|$)/g,
                    '',
                  ),
                  imageUrl: result.images[0].url,
                  url: result.url,
                  site: {
                    logo: result.site.logo,
                    name: result.site.name,
                  },
                });

                increment();
              }
            } else {
              updateArticleState({
                site: {
                  logo: `https://www.google.com/s2/favicons?domain=${articleState.url}&sz=256`,
                  name: new URL(articleState.url).host.replace(
                    /.+\/\/|www.|\..+/g,
                    '',
                  ),
                },
              });

              increment();
            }
          }}
          className={makeButtonLarger('2.5rem', '15px')}
          colorTheme='purple500'
          fullWidth
        >
          Create
        </Button>
      )}
      {currentStep === 2 && (
        <Button
          isLoading={loadingCreateArticle}
          loadingText={loadingCreateArticle ? '' : 'Posting'}
          onClick={async () => {
            const result = await createArticle(
              articleState as CreateArticleInput,
            );
            if (result) {
              resetWebsiteUrl();
              updateArticleState(defaultArticleState);
              close();
            }
          }}
          className={makeButtonLarger('2.5rem', '15px')}
          colorTheme='purple500'
          fullWidth
        >
          Post
        </Button>
      )}
    </Fragment>
  );
}
CreateArticleButton.displayName = 'CreateArticleButton';

export default CreateArticleButton;
