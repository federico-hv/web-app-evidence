import { Button, HStack, IconButton, Skeleton } from '@holdr-ui/react';
import { Error, Loader } from '../../utility';
import { EditProfileDialog } from '../../dialogs';
import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP_WITH_USER } from 'lib';
import { useLocation } from 'react-router-dom';

function SocialButton() {
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{
    relationshipWithUser: 'none' | 'owned' | 'following';
  }>(GET_RELATIONSHIP_WITH_USER, {
    variables: {
      username: username,
    },
  });

  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader loading={loading} as={<Skeleton />}>
        {data && data.relationshipWithUser && (
          <>
            {data.relationshipWithUser === 'none' && (
              <HStack gap={3} items='center'>
                <Button
                  size={{ '@bp1': 'base', '@bp4': 'base' }}
                  label='Follow'
                />
                <IconButton
                  variant='ghost'
                  size={{ '@bp1': 'base', '@bp4': 'base' }}
                  ariaLabel='more'
                  icon='more-fill'
                />
              </HStack>
            )}

            {data.relationshipWithUser === 'owned' && (
              <EditProfileDialog />
            )}
          </>
        )}
      </Loader>
    </Error>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
