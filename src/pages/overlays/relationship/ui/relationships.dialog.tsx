import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  IconButton,
  useDisclosure,
} from '@holdr-ui/react';
import {
  LoadWithoutPreviousLocation,
  QueryGuard,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  usePreviousLocation,
} from '../../../../shared';
import { Fragment } from 'react';
import { CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED } from '../../../../features';

function RelationshipsDialog() {
  const { username } = useParams();
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  // go back to previous location if the user has account is protected or blocked

  if (!username) {
    return <Fragment />;
  }

  return (
    <QueryGuard
      query={CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED}
      args={{ username }}
      name='checkIsProfileBlockedOrProtected'
      fallback={<Navigate to={previousLocation} />}
    >
      <LoadWithoutPreviousLocation default={`/${username}/bio`} />
      <Dialog
        {...disclosure}
        onClose={() => navigate(location.state?.previousLocation || '/')}
      >
        <DialogPortal>
          <DialogOverlay blur={2} zIndex={20} />
          <DialogContent
            zIndex={20}
            radius={4}
            className='setup-account'
            minWidth={500}
            h={600}
            maxHeight='90vh'
            bgColor='rgba(64, 64, 102, 0.80)'
            overflow='auto'
            css={{
              backdropFilter: 'blur(12px)',
            }}
          >
            <DialogBody overflowY='hidden' zIndex={50} px={6} py={6}>
              <RoutingTabs flex={1}>
                <RoutingTabsHeader
                  h='fit-content'
                  // items='center'
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1} maxHeight={60}>
                    <RoutingTabsTrigger
                      state={{ previousLocation }}
                      tabIndex={0}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{ color: '$white700', fontWeight: 400 }}
                      _active={{
                        color: '$white500',
                        borderBottom: '2px solid $purple500',
                        fontWeight: 500,
                      }}
                      _hover={{ background: '#9898FF26' }}
                      to='followers'
                    >
                      Followers
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      state={{ previousLocation }}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{ color: '$white700', fontWeight: 400 }}
                      _active={{
                        color: '$white500',
                        borderBottom: '2px solid $purple500',
                        fontWeight: 500,
                      }}
                      _hover={{ background: '#9898FF26' }}
                      to='following'
                    >
                      Following
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                  <IconButton
                    onClick={() => navigate(previousLocation)}
                    colorTheme='white500'
                    size='sm'
                    ariaLabel='close'
                    variant='outline'
                    icon='close'
                  />
                </RoutingTabsHeader>
                <RoutingTabsContent />
              </RoutingTabs>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </QueryGuard>
  );
}
RelationshipsDialog.displayName = 'RelationshipsDialog';

export default RelationshipsDialog;
