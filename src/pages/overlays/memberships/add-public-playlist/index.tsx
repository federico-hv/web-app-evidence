import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  GQLRenderer,
  InputTextField,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  makePath,
  TextareaField,
} from '../../../../shared';

function AddPublicPlaylist() {
  const { slug } = useParams();

  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const close = () => navigate(location.state?.previousLocation || '/');
  return (
    <Fragment>
      <LoadWithoutPreviousLocation
        default={makePath(['memberships', slug ?? '', 'events'])}
      />
      <GQLRenderer>
        <Dialog {...disclosure} onClose={close}>
          <DialogPortal>
            <DialogOverlay zIndex={15} />
            <DialogContent
              zIndex={20}
              w={625}
              h={625}
              p={8}
              minHeight={200}
              overflowY='hidden'
              maxHeight='90vh'
              bgColor='#F7F7F7'
              css={{
                userSelect: 'none',
              }}
            >
              <DialogBody
                h='100%'
                zIndex={50}
                px={0}
                py={0}
                id='page-dialog-container'
                color='black500'
                overflow='hidden'
              >
                <VStack
                  as='form'
                  flex={1}
                  overflowY='auto'
                  className='thin-scrollbar'
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Heading size={6} weight={500} as='h2'>
                    Add a Public Playlist
                  </Heading>
                  <VStack
                    mt='56px'
                    overflowY='auto'
                    flex={1}
                    css={{ gap: '56px' }}
                  >
                    <VStack gap={4}>
                      <InputTextField
                        placeholder='Enter what you would like to call your public playlist'
                        color='black500'
                        className=''
                        name='title'
                        label='Title'
                        labelProps={{
                          color: 'base800',
                        }}
                        required
                      />
                      <InputTextField
                        placeholder='Copy & paste your  public playlist embed code'
                        color='black500'
                        type='search'
                        className=''
                        name='venue'
                        label='Embedded Playlist'
                        labelProps={{
                          color: 'base800',
                        }}
                        required
                      />
                    </VStack>
                  </VStack>
                  <HStack
                    pt={4}
                    bgColor='#F7F7F7'
                    position='sticky'
                    b={0}
                    gap={4}
                    mt={9}
                    justify='flex-end'
                  >
                    <Button
                      onClick={close}
                      type='button'
                      variant='ghost'
                      colorTheme='base800'
                      radius={1}
                      className={makeButtonLarger('2.5rem')}
                      css={{ px: '$6' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      colorTheme='purple500'
                      radius={1}
                      className={makeButtonLarger('2.5rem')}
                      css={{ px: '$6' }}
                    >
                      Create
                    </Button>
                  </HStack>
                </VStack>
              </DialogBody>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </GQLRenderer>
    </Fragment>
  );
}

export default AddPublicPlaylist;
