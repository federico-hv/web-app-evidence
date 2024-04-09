import { Button } from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  CreateArticleInput,
  useCreateArticle,
  useCreateOgMetadata,
} from '../../../../../shared';
import {
  makeButtonLarger,
  useStepperContext,
} from '../../../../../../../shared';
import {
  useCreateFeedContext,
  defaultArticleState,
  ArticleSchema,
  MaxArticleDescription,
  MaxArticleTitle,
} from '../../shared';

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

  /*
    Valid URL examples

    https://pages.github.com -> with subdomain
    https://pages.github.com/onepath -> One path
    https://pages.github.com/onepath/twopaths/morepaths -> Multiple paths
    https://random.random.random.pages.github.com -> Multiple subdomains


    Invalid URL examples

    github.com -> No scheme or www subdomain
    www.github.com -> No scheme
    http://pages.github.com -> Not secure

  */
  const isWebsiteInvalid = () => {
    if (websiteUrl.length < 1) {
      return true;
    }

    const websiteRegex = new RegExp(
      /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-z]{2,6}(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?$/,
    );

    return !websiteRegex.test(websiteUrl);
  };

  const isArticleInvalid = () => {
    try {
      ArticleSchema.validateSync(articleState);
      return false;
    } catch (e) {
      return true;
    }
  };

  return (
    <Fragment>
      {currentStep === 1 && (
        <Button
          disabled={!badLink ? isWebsiteInvalid() : isArticleInvalid()}
          isLoading={loadingCreateOgMetadata}
          loadingText={loadingCreateOgMetadata ? '' : 'Posting'}
          onClick={async () => {
            if (!badLink) {
              const result = await createOgMetadata(websiteUrl);

              if (result) {
                resetWebsiteUrl();

                updateArticleState({
                  title: result.title
                    .replace(/<\/?[^>]+(>|$)/g, '')
                    .slice(0, MaxArticleTitle),
                  description: result.description
                    .replace(/<\/?[^>]+(>|$)/g, '')
                    .slice(0, MaxArticleDescription),
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
          disabled={isArticleInvalid()}
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
