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
  useOnValueChange,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  GQLRenderer,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  makePath,
  TextareaField,
} from '../../../../shared';

const defaultMessage =
  "When I'm not performing, I love exploring new interests and discovering other passions that keep me inspired. Check out what I enjoy doing in my free time";

function MembershipAddCustomMoreDescriptionPage() {
  const { value, handleOnValueChange } = useOnValueChange('');

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
                  overflowY='auto'
                  className='thin-scrollbar'
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Heading size={6} weight={500} as='h2'>
                    Add a description for More Perks
                  </Heading>
                  <VStack
                    mt='56px'
                    overflowY='auto'
                    flex={1}
                    css={{ gap: '56px' }}
                  >
                    <VStack gap={1}>
                      <TextareaField
                        value={value}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          handleOnValueChange(e.target.value)
                        }
                        maxLength={250}
                        required
                        minLines={5}
                        maxLines={6}
                        colorTheme='black500'
                        placeholder='Share what your members can expect through More Perks'
                        color='black500'
                        className=''
                        name='description'
                        tooltip={
                          <Box
                            border={1}
                            borderColor='black500'
                            p={1}
                            radius={1}
                            bgColor='base50'
                            color='black500'
                          >
                            Something cool
                          </Box>
                        }
                        label='Description'
                        labelProps={{
                          color: 'base800',
                        }}
                      />
                      <Button
                        onClick={() => handleOnValueChange(defaultMessage)}
                        size='sm'
                        radius={1}
                        variant='link'
                        css={{ px: '$1' }}
                      >
                        Use Default Text
                      </Button>
                    </VStack>
                  </VStack>
                  <HStack
                    pt={4}
                    bgColor='#F7F7F7'
                    position='sticky'
                    b={0}
                    flex={1}
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
                      Save
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

export default MembershipAddCustomMoreDescriptionPage;
