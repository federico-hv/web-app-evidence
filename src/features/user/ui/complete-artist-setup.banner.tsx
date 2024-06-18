import { useLocation, useNavigate } from 'react-router-dom';
import { makePath, Paths } from '../../../shared';
import {
  Alert,
  AlertAction,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
} from '@holdr-ui/react';
import { Fragment, useRef } from 'react';
import {
  useCurrentArtist,
  useSuspenseIsArtistProfileComplete,
} from '../../artist';

function CompleteArtistSetupBanner() {
  const currentArtist = useCurrentArtist();

  const { data } = useSuspenseIsArtistProfileComplete();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  if (data.isArtistProfileComplete || !currentArtist) {
    return <Fragment />;
  }

  return (
    <Box ref={ref} as='header' w='100%' t={0} position='fixed' zIndex={15}>
      <Container
        maxWidth={1280}
        mt={2}
        css={{
          backgroundColor: '#141317',
        }}
      >
        <Alert bgColor='warning600' css={{ outline: 'none' }}>
          <AlertIcon
            color='warning100'
            alignSelfStart
            icon='warning-fill'
          />
          <AlertContent>
            <AlertTitle color='black500'>Complete your profile</AlertTitle>
            <AlertDescription color='black500'>
              Complete your profile to get full access of the artist
              features on Holdr!
            </AlertDescription>
          </AlertContent>
          <AlertActions>
            <AlertAction
              onClick={() =>
                navigate(
                  makePath([
                    Paths.setupArtists,
                    Paths.setupArtist.uploadPhoto,
                  ]),
                  {
                    state: {
                      previousLocation: pathname,
                    },
                  },
                )
              }
              colorTheme='warning100'
              css={{
                px: 28,
                py: 14,
                height: '2.5rem',
              }}
            >
              Complete Profile
            </AlertAction>
            <AlertClose
              onClick={() => {
                ref && ref.current && ref.current.remove();
              }}
              colorTheme='white500'
            />
          </AlertActions>
        </Alert>
      </Container>
    </Box>
  );
}
CompleteArtistSetupBanner.displayName = 'CompleteArtistSetupBanner';

export default CompleteArtistSetupBanner;
