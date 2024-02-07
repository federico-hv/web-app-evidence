import { useCurrentUser } from '../../auth';
import { Fragment } from 'react';
import { Box, Button, Heading, VStack } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../shared';
import {MyMembersItem} from './index';
import { dummyMember } from '../../../pages/clubs/shared';
import { matchPath, useLocation } from 'react-router-dom';

function MyMembers() {
  const currentUser = useCurrentUser();
  const {pathname} = useLocation();

  if (!currentUser || (currentUser && currentUser.role === 'general')) {
    return <Fragment />;
  }

  return (
    <VStack as='nav' p={4}>
      <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
        My Members
      </Heading>
      <Box
        mt={{ '@bp1': '8px', '@bp3': '8px' }}
        mb={{ '@bp1': '16px', '@bp3': '16px' }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      {/* <Button
        fullWidth
        className={makeButtonLarger('2.5rem')}
        colorTheme='purple500'
      >
        Create Club
      </Button> */}
      <VStack gap={3}>
        <MyMembersItem data={dummyMember} isOnline={true} to={dummyMember.username} active={!!matchPath(dummyMember.username, pathname)}/>
        <MyMembersItem data={dummyMember} isOnline={true} to={dummyMember.username} active={!!matchPath(dummyMember.username, pathname)}/>
        <MyMembersItem data={dummyMember} isOnline={false} to={dummyMember.username} active={!!matchPath(dummyMember.username, pathname)}/>
        <MyMembersItem data={dummyMember} isOnline={false} to={dummyMember.username} active={!!matchPath(dummyMember.username, pathname)}/>
      </VStack>
    </VStack>
  );
}
MyMembers.displayName = 'MyMembers';

export default MyMembers;
