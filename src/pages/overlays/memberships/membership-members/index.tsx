import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  arrayFrom,
  Avatar,
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  Asset,
  GQLRenderer,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  makePath,
} from '../../../../shared';
import { FlatList } from '../../../../tmp/flat-list';

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
              w={500}
              h={575}
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
                  gap={4}
                  divider={<Box h='1px' bgColor='base200' />}
                >
                  <HStack justify='space-between'>
                    <Heading weight={400} size={6}>
                      Club Members
                    </Heading>
                    <CloseButton
                      onClick={close}
                      variant='outline'
                      css={{
                        width: '1.5rem',
                        height: '1.5rem',
                      }}
                    />
                  </HStack>
                  <FlatList
                    gap={4}
                    direction='vertical'
                    data={arrayFrom(20).map((num) => ({
                      displayName: `Jake ${num + 1}`,
                      username: 'jake_hall',
                      avatar: Asset.Image.DarkPlaceholder,
                      id: `ID-${num + 1}`,
                    }))}
                    renderItem={(item) => (
                      <HStack items='center' justify='space-between'>
                        <HStack items='center' gap={2}>
                          <Avatar size={40} src={item.avatar} />
                          <Text weight={500}>{item.displayName}</Text>
                        </HStack>
                        <Button
                          className={makeButtonLarger('2rem')}
                          colorTheme='purple500'
                          css={{ px: '$6' }}
                        >
                          Follow
                        </Button>
                      </HStack>
                    )}
                    keyExtractor={(item) => item.id}
                  />
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
