import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
} from '@holdr-ui/react';
import { Fragment, useState } from 'react';
import {
  ImageUpload,
  LiveTag,
  TextGroup,
  TextGroupSubheading,
} from '../../../../../shared';
import { ImageUploadContext } from '../../../../../shared/components/image-upload/context';
import { useUpdateClub } from '../../../../../features';

function ChangeClubImage({ placeholder }: { placeholder?: string }) {
  const [, setValue] = useState<string>();
  const { updateClub } = useUpdateClub();

  return (
    <Card
      radius={2}
      w={205}
      css={{ border: '1px solid rgba(152, 152, 255, 0.15)' }}
    >
      <CardBody
        position='relative'
        h={182}
        bgColor='rgba(152, 152, 255, 0.15)'
      >
        <HStack
          position='absolute'
          t={0}
          l={0}
          r={0}
          p={2}
          zIndex={20}
          items='center'
          justify='space-between'
        >
          <LiveTag />
          <IconButton
            size='sm'
            colorTheme='darkTint500'
            icon='eye-show'
            ariaLabel='add to watchlist'
          />
        </HStack>
        <ImageUpload
          aspect={1.12}
          onChange={async (item) => {
            setValue(URL.createObjectURL(item));
            await updateClub({ coverImage: item });
          }}
          title='Edit auction image'
          name='coverImage'
          placeholder={placeholder}
        >
          <ImageUploadContext.Consumer>
            {({ src }) => (
              <Fragment>
                {!src ? (
                  <Center position='relative'>
                    <Center
                      position='absolute'
                      t={0}
                      l={0}
                      w='100%'
                      h='100%'
                    >
                      <Center
                        className='image-add-icon'
                        p={1}
                        bgColor='#1A1A29'
                        radius='full'
                      >
                        <Icon color='white500' name='add' />
                      </Center>
                    </Center>
                  </Center>
                ) : (
                  <Box id='imagess' h='100%' w='100%'>
                    <Image
                      fallback={<Fragment />}
                      alt='clubs banner image'
                      key={src}
                      src={src}
                    />
                  </Box>
                )}
              </Fragment>
            )}
          </ImageUploadContext.Consumer>
        </ImageUpload>
      </CardBody>
      <CardFooter p={3} gap={2}>
        <Text>Artist name</Text>
        <TextGroup gap={0}>
          <TextGroupSubheading casing='uppercase' size={1}>
            Entry price
          </TextGroupSubheading>
          <TextGroupSubheading size={3} weight={500}>
            $0.00 USD
          </TextGroupSubheading>
        </TextGroup>
      </CardFooter>
    </Card>
  );
}

export default ChangeClubImage;
