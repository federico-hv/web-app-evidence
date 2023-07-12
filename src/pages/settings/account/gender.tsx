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
} from '../../../features';
import {
  Error,
  Head,
  HeaderLayout,
  isInputDisabled,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../shared';
import { Formik } from 'formik';
import { isEqual, pick } from 'lodash';
import { styled } from '../../../configs';

const RadioWrapper = styled('label', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

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
      <HeaderLayout
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
                  <Text id='Gender_Male'>Male</Text>
                  <Radio
                    onChange={handleChange}
                    checked={values.gender === 'Male'}
                    labelledBy='Gender_Male'
                    name='gender'
                    value='Male'
                  />
                </RadioWrapper>
                <RadioWrapper>
                  <Text id='Gender_Female'>Female</Text>
                  <Radio
                    onChange={handleChange}
                    checked={values.gender === 'Female'}
                    labelledBy='Gender_Male'
                    name='gender'
                    value='Female'
                  />
                </RadioWrapper>
                <RadioWrapper>
                  <Text id='Gender_Specify'>Specify</Text>
                  <Radio
                    onChange={handleChange}
                    checked={
                      !!values.gender &&
                      values.gender.length > 0 &&
                      values.gender !== 'Male' &&
                      values.gender !== 'Female'
                    }
                    labelledBy='Gender_Male'
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
      </HeaderLayout>
    </Error>
  );
}
GenderSettingPage.displayName = 'GenderSettingPage';

export default GenderSettingPage;
