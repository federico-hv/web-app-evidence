import {
  Button,
  HStack,
  Input,
  Radio,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FormEvent } from 'react';
import {
  AccountInfoFormData,
  IAccountInfo,
  useUpdateAccountInfo,
  UpdateAccountInfoSchema,
  useAccountInfo,
} from '../../../../features';
import {
  Error,
  Head,
  isInputDisabled,
  Paths,
  prefix,
  RadioWrapper,
  RootSettingsPath,
} from '../../../../shared';
import { Formik } from 'formik';
import { isEqual, pick } from 'lodash';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function GenderSettingPage() {
  const { data } = useAccountInfo();
  const {
    loading: loadingMutation,
    error: errorMutation,
    onSubmit,
    onFinish,
  } = useUpdateAccountInfo();

  return (
    <Error
      hasError={!!errorMutation}
      errorMessage={errorMutation?.message}
    >
      <Head
        title='Update gender'
        description='Change your gender.'
        url={`${Paths.settings}/${Paths.setting.gender}`}
      />
      <SettingsHeaderLayout
        title='Gender'
        backLink={prefix(RootSettingsPath, Paths.setting.account_info)}
      >
        <Formik<AccountInfoFormData>
          initialValues={{ gender: data.gender }}
          validationSchema={UpdateAccountInfoSchema}
          onSubmit={async (data) => {
            try {
              await onSubmit(data);
              onFinish();
            } catch (e) {
              return;
            }
          }}
        >
          {({ handleSubmit, errors, handleChange, values }) => (
            <VStack
              as='form'
              gap={5}
              p={4}
              borderBottom={2}
              borderTop={2}
              borderColor='base100'
              onSubmit={(e) =>
                handleSubmit(e as FormEvent<HTMLFormElement>)
              }
            >
              <VStack as='fieldset' gap={5}>
                <RadioWrapper>
                  <Text id='gender:male'>Male</Text>
                  <Radio
                    onChange={handleChange}
                    checked={values.gender === 'Male'}
                    labelledBy='gender:male'
                    name='gender'
                    value='Male'
                  />
                </RadioWrapper>
                <RadioWrapper>
                  <Text id='gender:female'>Female</Text>
                  <Radio
                    onChange={handleChange}
                    checked={values.gender === 'Female'}
                    labelledBy='gender:female'
                    name='gender'
                    value='Female'
                  />
                </RadioWrapper>
                <RadioWrapper>
                  <Text id='gender:specify'>Specify</Text>
                  <Radio
                    onChange={handleChange}
                    checked={
                      !!values.gender &&
                      values.gender.length > 0 &&
                      values.gender !== 'Male' &&
                      values.gender !== 'Female'
                    }
                    labelledBy='gender:specify'
                    name='gender'
                    value='Specific'
                  />
                </RadioWrapper>
              </VStack>
              {values.gender &&
                values.gender?.length > 0 &&
                values.gender !== 'Male' &&
                values.gender !== 'Female' && (
                  <Input
                    name='gender'
                    value={
                      values.gender === 'Specific' ? '' : values.gender
                    }
                    onChange={handleChange}
                  />
                )}
              <HStack justify='flex-end'>
                <Button
                  type='submit'
                  loadingText={loadingMutation ? '' : 'Saving'}
                  isLoading={loadingMutation}
                  disabled={
                    values.gender === 'Specific' ||
                    isEqual(values, pick(data, 'gender')) ||
                    isInputDisabled(values as IAccountInfo, errors, [
                      'gender',
                    ])
                  }
                >
                  Update
                </Button>
              </HStack>
            </VStack>
          )}
        </Formik>
      </SettingsHeaderLayout>
    </Error>
  );
}
GenderSettingPage.displayName = 'GenderSettingPage';

export default GenderSettingPage;
