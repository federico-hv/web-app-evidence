import {
  GQLRenderer,
  LoadWithoutPreviousLocation,
  makePath,
  Paths,
  usePreviousLocation,
} from '../../../../shared';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useDisclosure,
} from '@holdr-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';

export function useCurrentPath() {
  const location = useLocation();

  const paths = location.pathname.split('/');

  return paths[paths.length - 1];
}

function SettingsDialog() {
  const disclosure = useDisclosure(true);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = useCurrentPath();

  if (
    [
      Paths.setting.account,
      Paths.setting.privacy,
      Paths.setting.notifications,
    ].includes(currentPath)
  ) {
    // hide dialog if the dialog routes /* are not shown
    return <Fragment />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation
        default={makePath([Paths.settings, Paths.setting.account])}
      />
      <GQLRenderer>
        <Dialog
          {...disclosure}
          onClose={() => navigate(location.state?.previousLocation || '/')}
        >
          <DialogPortal>
            <DialogOverlay zIndex={15} />
            <DialogContent
              zIndex={20}
              className='setup-account'
              w={550}
              minHeight={200}
              overflowY='hidden'
              maxHeight='90vh'
              bgColor='#30304B'
              css={{
                userSelect: 'none',
              }}
            >
              <DialogBody
                h='100%'
                zIndex={50}
                py={0}
                px={0}
                id='page-dialog-container'
              >
                <GQLRenderer>
                  <Outlet />
                </GQLRenderer>
              </DialogBody>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </GQLRenderer>
    </Fragment>
  );
}

export default SettingsDialog;
