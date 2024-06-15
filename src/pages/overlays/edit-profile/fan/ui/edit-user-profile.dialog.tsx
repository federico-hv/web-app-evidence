import {
  Box,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  hexToRGB,
  HStack,
  StackDivider,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Fragment } from 'react';
import {
  GQLRenderer,
  LoadWithoutPreviousLocation,
  makePath,
} from '../../../../../shared';
import { ProfileProvider } from '../../../../profile/shared';
import { SetupStep } from '../../../artist-profile/ui';
import ChangeAvatar from './change-avatar';

function EditUserProfileDialog() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = useParams();

  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  if (!username) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default={`/${username}/bio`} />
      <GQLRenderer>
        <ProfileProvider>
          <Dialog
            {...disclosure}
            onClose={() =>
              navigate(location.state?.previousLocation || '/')
            }
          >
            <DialogPortal>
              <DialogOverlay zIndex={15} />
              <DialogContent
                zIndex={20}
                className='setup-account'
                w={881}
                h={724}
                maxHeight='90vh'
                bgColor='#30304B'
                overflow='auto'
                css={{
                  userSelect: 'none',
                }}
              >
                <DialogBody
                  h='100%'
                  zIndex={50}
                  py={0}
                  px={48}
                  id='page-dialog-container'
                >
                  <HStack
                    h='100%'
                    css={{ gap: '48px' }}
                    divider={
                      <StackDivider
                        width={1}
                        color={hexToRGB('#9898FF', 0.1)}
                      />
                    }
                  >
                    <Box py={48} basis={182}>
                      <ChangeAvatar />

                      <VStack gap={6} mt={9}>
                        <SetupStep
                          number={1}
                          path={makePath([username, 'edit', 'profile'])}
                          description='My Profile'
                          active={
                            currentPath === 'profile' ||
                            currentPath === 'favourites' ||
                            currentPath === 'credit-card'
                          }
                        />
                        <SetupStep
                          number={2}
                          path={makePath([username, 'edit', 'favourites'])}
                          description='Add Favourites'
                          active={
                            currentPath === 'favourites' ||
                            currentPath === 'credit-card'
                          }
                        />
                      </VStack>
                    </Box>

                    <Box py={48} flex={1}>
                      <Outlet />
                    </Box>
                  </HStack>
                </DialogBody>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </ProfileProvider>
      </GQLRenderer>
    </Fragment>
  );
}
EditUserProfileDialog.displayName = 'EditUserProfileDialog';
export default EditUserProfileDialog;
