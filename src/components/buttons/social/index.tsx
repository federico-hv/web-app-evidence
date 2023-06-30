import { Skeleton } from '@holdr-ui/react';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';
import { EditProfileDialog } from '../../dialog';
import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP, RelationshipModel } from 'lib';
import { useLocation } from 'react-router-dom';
import FollowButton from '../follow';
import { FollowingButton2 } from '../following';

function SocialButton() {
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{
    relationship: RelationshipModel;
  }>(GET_RELATIONSHIP, {
    variables: {
      username: username,
    },
  });

  return (
    <Error hasError={!!error} errorEl={<></>}>
      <Loader loading={loading} as={<Skeleton />}>
        {data && data.relationship && (
          <>
            <SwitchConditional>
              <SwitchConditionalCase on={!data.relationship.code}>
                <FollowButton />
              </SwitchConditionalCase>
              <SwitchConditionalCase on={data.relationship.code === 'F'}>
                <FollowingButton2 />
              </SwitchConditionalCase>
            </SwitchConditional>

            {data.relationship.code === 'O' && <EditProfileDialog />}
          </>
        )}
      </Loader>
    </Error>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
