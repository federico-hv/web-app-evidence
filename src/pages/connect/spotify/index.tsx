import { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Center,
  CircularProgress,
  useDisclosure,
} from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  Head,
  Loader,
  makePath,
  Paths,
} from '../../../shared';
import { Navigate } from 'react-router-dom';
import { useConnectAccount, useSpotifyUser } from '../../../features';

function ConnectSpotifyRedirect() {
  const {
    loading: loadingMutation,
    error: mutationError,
    connectAccount,
  } = useConnectAccount();
  const { data, error, isLoading } = useSpotifyUser();

  const [errorMessage, setErrorMessage] = useState(
    'Oops, something went wrong and its our fault. Please try again later.',
  );

  const disclosure = useDisclosure(true);

  // Path logic
  const path = makePath([Paths.setupFlow, Paths.releases, 'connection']);
  let previousLocation = { pathname: '/releases' };

  const str = window.localStorage.getItem('previous_location');

  if (str) {
    previousLocation = JSON.parse(str);
  }

  useEffect(() => {
    if (data) {
      // make request
      connectAccount({
        socialProvider: 'spotify',
        socialId: data.me.id,
        ...data.tokens,
      })
        .then((res) => {
          if (res.data && !res.data.connectAccount.status) {
            setErrorMessage(res.data.connectAccount.message);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [data]);

  return (
    <Fragment>
      <Head prefix='' title='Connecting to Spotify' />
      <Box
        as='main'
        t={{ '@bp1': 0, '@bp3': 65 }}
        borderRight={2}
        borderLeft={2}
        h='fit-content'
        minHeight='calc(100vh - 65px)'
        borderColor='base100'
        position='relative'
        pb={{ '@bp1': 56, '@bp3': 0 }}
      >
        <CommonDialog {...disclosure}>
          <CommonDialogHeader label='Connecting Spotify' />
          <CommonDialogContent>
            <Center>
              <Loader
                as={
                  <CircularProgress
                    isIndeterminate
                    size={100}
                    thickness={5}
                  />
                }
                h={200}
                loading={isLoading || loadingMutation}
              >
                <Navigate
                  to={path}
                  state={{
                    previousLocation,
                    step: 'connection',
                    errorMessage:
                      error || mutationError ? errorMessage : '',
                  }}
                />
              </Loader>
            </Center>
          </CommonDialogContent>
        </CommonDialog>
      </Box>
    </Fragment>
  );
}
ConnectSpotifyRedirect.displayName = 'ConnectSpotifyRedirect';

export default ConnectSpotifyRedirect;
