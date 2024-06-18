import { useState } from 'react';
import { useUpdateAvatar } from '../../../../features';
import { Avatar, AvatarBadge, Box, Icon } from '@holdr-ui/react';
import { ImageUpload } from '../../../../shared';
import { ImageUploadContext } from '../../../../shared/components/image-upload/context';

function ChangeAvatar({
  placeholder,
  variant,
  name,
}: {
  placeholder?: string;
  name: string;
  variant: 'circle' | 'squircle';
}) {
  const [, setValue] = useState<string>();
  const { updateAvatar } = useUpdateAvatar();

  return (
    <Box w='100px' h='100px' ml={-10}>
      {/*Sneaky way to stop cutting of content*/}
      <ImageUpload
        onChange={async (item) => {
          setValue(URL.createObjectURL(item));
          await updateAvatar(item);
        }}
        title='Update avatar'
        name='avatar'
        placeholder={placeholder}
      >
        <ImageUploadContext.Consumer>
          {({ src }) => (
            <Avatar
              src={src}
              key={src}
              size={75}
              variant={variant}
              fallbackTextSize={6}
              fallbackBgColor='rgba(185, 185, 255, 0.30)'
              name={name}
            >
              <AvatarBadge
                t={-10}
                border={1}
                borderColor='rgba(152, 152, 255, 0.35)'
                size={30}
                bgColor='#232338'
              >
                <Icon color='purple200' name='edit-outline' />
              </AvatarBadge>
            </Avatar>
          )}
        </ImageUploadContext.Consumer>
      </ImageUpload>
    </Box>
  );
}
ChangeAvatar.displayName = 'ChangeAvatar';

export default ChangeAvatar;
