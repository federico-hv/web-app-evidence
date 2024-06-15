import { useState } from 'react';
import { IProfile, useUpdateAvatar } from '../../../../../features';
import {
  Avatar,
  AvatarBadge,
  Box,
  Icon,
  useGeneralContext,
} from '@holdr-ui/react';
import { ImageUpload } from '../../../../../shared';
import { ImageUploadContext } from '../../../../../shared/components/image-upload/context';

function ChangeAvatar() {
  const [, setValue] = useState<string>();

  const { updateAvatar } = useUpdateAvatar();

  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Box w='100px' h='100px' ml={-10}>
      {/* Sneaky way to stop cutting of content*/}
      <ImageUpload
        onChange={async (item) => {
          setValue(URL.createObjectURL(item));
          await updateAvatar(item);
        }}
        title='Update avatar'
        name='avatar'
        placeholder={profile.avatar}
      >
        <ImageUploadContext.Consumer>
          {({ name, src }) => (
            <Avatar
              src={src}
              key={src}
              size={75}
              fallbackTextSize={6}
              fallbackBgColor='rgba(185, 185, 255, 0.30)'
              name='Elena Gilbert'
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
