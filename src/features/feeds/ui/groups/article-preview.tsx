import {
  CustomCommonDialogButtonWrapper,
  extraBtnPadding,
  OgMetadata,
  OgMetadataCard,
  useDialogTabContext,
  useGeneralContext,
} from '../../../../shared';
import { useCreateArticle } from '../../shared';
import { Button, VStack } from '@holdr-ui/react';

function ArticlePreview() {
  const { state }: { state: { data: OgMetadata } } = useGeneralContext();
  const { onClose } = useDialogTabContext();
  const { createArticle, loading, error } = useCreateArticle();

  console.log(state);

  return (
    <VStack py={4} h='full' justify='space-between'>
      <OgMetadataCard data={state.data} />
      <CustomCommonDialogButtonWrapper>
        <Button
          isLoading={loading}
          loadingText={loading ? '' : 'Posting'}
          onClick={async () => {
            await createArticle({
              title: state.data.title,
              description: state.data.description,
              imageUrl: state.data.images[0].url,
              url: state.data.url,
              site: {
                name: state.data.site.name,
                logo: state.data.site.logo,
              },
            });

            if (!error) {
              onClose();
            }
          }}
          className={extraBtnPadding()}
          fullWidth
        >
          Post
        </Button>
      </CustomCommonDialogButtonWrapper>
    </VStack>
  );
}
ArticlePreview.displayName = 'ArticlePreview';

export default ArticlePreview;
