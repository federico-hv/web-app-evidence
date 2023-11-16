import { Box, useDisclosure, VStack } from '@holdr-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import {
  arrayFrom,
  CommonDialog,
  CommonDialogActionButton,
  CommonDialogContent,
  CommonDialogHeader,
  GeneralContextProvider,
  Head,
  makePath,
  Paths,
  prefix,
  StepperIndicator,
  StepperIndicatorStep,
  useRecordState,
  useToast,
} from '../../../shared';
import { IUnconnectedDialogContext, StepNumber } from './shared';
import { getStepNumber } from './shared/utility';
import { StepMap } from './shared/constants';

function SetupReleasesFlow() {
  const disclosure = useDisclosure(true);

  const { openWith } = useToast();

  const [height, setHeight] = useState('550px');
  const [state, update] = useRecordState<IUnconnectedDialogContext>({
    ids: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/');
  const currentPath = paths[paths.length - 1];
  const stepNumber = getStepNumber(currentPath);

  const onClose = () => {
    const previousLocation = location.state?.previousLocation;

    update({ ids: [] });
    setHeight('550px');
    navigate(previousLocation || prefix('/', Paths.releases));
  };

  // Error handling
  useEffect(() => {
    if (location.state?.errorMessage && !location.state?.step) {
      openWith({
        status: 'danger',
        description: location.state.errorMessage,
      });
    }
  }, [location]);

  // Redirection handling :- Required for hack in pages/connect/spotify/index.tsx
  useEffect(() => {
    if (location.state?.step) {
      navigate(
        makePath([Paths.setupFlow, Paths.releases, location.state?.step]),
        {
          state: {
            previousLocation: location.state?.previousLocation,
            errorMessage: location.state?.errorMessage || '',
          },
        },
      );
    }
  }, [location]);

  return (
    <Fragment>
      <Head title='Releases setup' />
      <GeneralContextProvider value={{ state, update }}>
        <CommonDialog minHeight={height} {...disclosure} onClose={onClose}>
          <CommonDialogHeader label='' />
          <CommonDialogContent>
            <VStack px={6} h='100%' justify='space-between'>
              <Outlet />
              <Box
                position='sticky'
                b={0}
                pt={3}
                pb={4}
                zIndex={10}
                css={{ backgroundColor: '#fff' }}
              >
                <StepperIndicator current={getStepNumber(currentPath)}>
                  {arrayFrom(2).map((idx) => (
                    <StepperIndicatorStep key={idx} />
                  ))}
                </StepperIndicator>
              </Box>
            </VStack>
          </CommonDialogContent>
          {stepNumber < 2 && (
            <CommonDialogActionButton
              label='Continue'
              onClick={() => {
                if (stepNumber === 1) {
                  setHeight('650px');
                }

                const nextStep = (stepNumber + 1) as StepNumber;
                navigate(
                  makePath([
                    Paths.setupFlow,
                    Paths.releases,
                    StepMap[nextStep],
                  ]),
                  {
                    state: {
                      previousLocation:
                        location.state?.previousLocation || location,
                    },
                  },
                );
              }}
            />
          )}
          {stepNumber === 2 && (
            <CommonDialogActionButton
              label={
                state.ids.length > 0
                  ? `Follow (${state.ids.length})`
                  : 'Skip'
              }
              onClick={onClose}
            />
          )}
        </CommonDialog>
      </GeneralContextProvider>
    </Fragment>
  );
}
SetupReleasesFlow.displayName = 'Setup Releases Flow';

export default SetupReleasesFlow;
