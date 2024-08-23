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
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

const getColors = (
  theme: 'secondary' | 'primary',
): {
  bgColor: ThemeColor | string;
  buttonColor: ThemeColor | string;
  iconButtonColor: ThemeColor;
  color: string;
  tabColor: {
    active: string;
    inactive: string;
  };
} => {
  if (theme === 'secondary') {
    return {
      bgColor: 'rgba(255, 255, 255)',
      buttonColor: '',
      iconButtonColor: 'base800',
      color: 'rgba(0, 0, 0)',
      tabColor: {
        active: '$base800',
        inactive: '$white700',
      },
    };
  } else {
    return {
      bgColor: 'rgba(64, 64, 102, 0.80)',
      buttonColor: '',
      iconButtonColor: 'white500',
      color: '$white700',
      tabColor: {
        active: '$white500',
        inactive: '$white700',
      },
    };
  }
};

function RelationshipsDialog() {
  const { username } = useParams();

  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation('/');

  const colorTheme = location.state.colorTheme;

  // go back to previous location if the user has account is protected or blocked

  if (!username) {
    return <Fragment />;
  }

  const colors = getColors(colorTheme);

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
            bgColor={colors.bgColor}
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
                      state={{ previousLocation, colorTheme }}
                      tabIndex={0}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{
                        color: colors.tabColor.inactive,
                        fontWeight: 400,
                      }}
                      _active={{
                        color: colors.tabColor.active,
                        borderBottom: '2px solid $purple500',
                        fontWeight: 500,
                      }}
                      _hover={{ background: '#9898FF26' }}
                      to='followers'
                    >
                      Followers
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      state={{ previousLocation, colorTheme }}
                      w='fit-content'
                      pt={1}
                      pb={5}
                      px={3}
                      fontSize={6}
                      _inactive={{
                        color: colors.tabColor.inactive,
                        fontWeight: 400,
                      }}
                      _active={{
                        color: colors.tabColor.active,
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
                    colorTheme={colors.iconButtonColor}
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
