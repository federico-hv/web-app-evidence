import { Fragment } from 'react';
import { Button, useDisclosure, VStack } from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  CommonDialogTrigger,
  Loader,
  useGeneralContext,
} from '../../../../shared';
import { IProfile, useEditProfile } from '../../../../features';
import { parseToProfileFormData } from '../../shared';
import { EditProfileForm } from '../forms';

function EditProfileButton() {
  const disclosure = useDisclosure();
  const { state: profile } = useGeneralContext<IProfile>();
  const { loading, onSubmit, onFinish } = useEditProfile();

  return (
    <Fragment>
      <CommonDialog minHeight={600} {...disclosure}>
        <CommonDialogTrigger>
          <Button size={{ '@bp1': 'base', '@bp4': 'base' }} label='Edit' />
        </CommonDialogTrigger>
        <CommonDialogHeader label='Edit profile' />
        <CommonDialogContent>
          <Loader loading={loading}>
            <VStack w='100%'>
              <EditProfileForm
                initialValues={parseToProfileFormData(profile)}
                onFinish={() => onFinish(disclosure.onClose)}
                onSubmit={onSubmit}
              />
            </VStack>
          </Loader>
        </CommonDialogContent>
      </CommonDialog>
    </Fragment>
  );
}
EditProfileButton.displayName = 'EditProfileButton';

export default EditProfileButton;
