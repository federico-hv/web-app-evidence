import { useNavigate } from 'react-router-dom';
import {
  makePath,
  Paths,
  Responsive,
  ResponsiveItem,
} from '../../../shared';
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
import { useRef } from 'react';

function CompleteArtistSetupBanner() {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <Box
          ref={ref}
          as='header'
          w='100%'
          h={80}
          position='fixed'
          zIndex={15}
        >
          <Container
            maxWidth={1280}
            mt={2}
            css={{
              backgroundColor: '#141317',
            }}
          >
            <Alert color='warning400' bgColor='rgba(232, 174, 56, 0.45)'>
              <AlertIcon alignSelfStart icon='warning-fill' />
              <AlertContent>
                <AlertTitle color='white500'>
                  Update your profile
                </AlertTitle>
                <AlertDescription color='white500'>
                  You should update your profile before moving..
                </AlertDescription>
              </AlertContent>
              <AlertActions>
                <AlertAction
                  onClick={() =>
                    navigate(makePath([Paths.setupProfile, Paths.artist]))
                  }
                  colorTheme='warning500'
                  css={{
                    px: 28,
                    py: 14,
                    height: '2.5rem',
                  }}
                >
                  Complete Profile
                </AlertAction>
                <AlertClose
                  onClick={() =>
                    ref && ref.current && ref.current.remove()
                  }
                  colorTheme='white500'
                />
              </AlertActions>
            </Alert>
          </Container>
        </Box>
      </ResponsiveItem>
    </Responsive>
  );
}
CompleteArtistSetupBanner.displayName = 'CompleteArtistSetupBanner';

export default CompleteArtistSetupBanner;
