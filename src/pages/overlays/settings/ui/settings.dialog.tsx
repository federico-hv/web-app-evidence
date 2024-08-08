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

function SettingsDialog() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();
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
