import {
  ArticleGeneralMoreButton,
  OwnerMoreButton,
  PostGeneralMoreButton,
  useCurrentUser,
  useFeedContext,
} from '../../../features';
import { Box } from '@holdr-ui/react';
import { SwitchConditional, SwitchConditionalCase } from '../../../shared';

function MoreOptionsButton({ type }: { type: 'article' | 'post' }) {
  const { owner } = useFeedContext();
  const currentUser = useCurrentUser();

  return (
    <Box position='relative' css={{ zIndex: 5 }}>
      {currentUser && currentUser.id === owner.id ? (
        <OwnerMoreButton />
      ) : (
        <SwitchConditional>
          <SwitchConditionalCase on={type === 'article'}>
            <ArticleGeneralMoreButton tinted={false} />
          </SwitchConditionalCase>
          <SwitchConditionalCase on={type === 'post'}>
            <PostGeneralMoreButton />
          </SwitchConditionalCase>
        </SwitchConditional>
      )}
    </Box>
  );
}
MoreOptionsButton.displayName = 'MoreOptionsButton';

export default MoreOptionsButton;
