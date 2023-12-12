import { Box, IconButton } from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  GeneralContextProvider,
  Stepper,
  StepperContext,
  useCounter,
  useDialogTabContext,
  useRecordState,
} from '../../../../shared';
import { ArticlePreview, ArticleUpload } from '../groups';

function AddArticleDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();
  const { increment, decrement, current: step } = useCounter(0);
  const [state, update] = useRecordState({});

  return (
    <CommonDialog
      ariaDescribedBy='add-article-dialog__title'
      isOpen={isOpen}
      onOpen={() => onOpen(option)}
      onClose={onClose}
    >
      <CommonDialogHeader label='Add Article' />
      <CommonDialogContent>
        <GeneralContextProvider
          value={{
            state: state,
            update: update,
          }}
        >
          <Stepper increment={increment} decrement={decrement} step={step}>
            <Stepper.Step step={0}>
              <ArticleUpload />
            </Stepper.Step>
            <Stepper.Step step={1}>
              <StepperContext.Consumer>
                {({ decrement }) => (
                  <Box
                    zIndex={100}
                    t='1rem'
                    l={{ '@bp1': '0.25rem', '@bp3': '1rem' }}
                    position='fixed'
                    css={{ backgroundColor: '#FFF' }}
                  >
                    <IconButton
                      onClick={decrement}
                      variant='ghost'
                      icon='arrow-left-outline'
                      ariaLabel='go back'
                    />
                  </Box>
                )}
              </StepperContext.Consumer>
              <ArticlePreview />
            </Stepper.Step>
          </Stepper>
        </GeneralContextProvider>
      </CommonDialogContent>
    </CommonDialog>
  );
}

export default AddArticleDialog;
