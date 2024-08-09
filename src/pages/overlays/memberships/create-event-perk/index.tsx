import {
  arrayFrom,
  Box,
  Button,
  CSSTheme,
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import {
  DatePicker,
  GQLRenderer,
  InputTextField,
  Label,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  makePath,
  SelectInputField,
  TextareaField,
  whiteSelectCSS,
} from '../../../../shared';
import dayjs from 'dayjs';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

function convertToHour(num: number): string {
  if (num < 12) {
    return `${num}:00 AM`;
  } else {
    return `${num}:00 PM`;
  }
}

function TimePicker({
  name,
  listCSS,
  triggerCSS,
  label,
  tooltip,
  required,
  labelProps,
}: {
  label?: string;
  name: string;
  errorText?: string;
  tooltip?: string;
  date: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
  required?: boolean;
  triggerCSS?: CSSTheme;
  listCSS?: CSSTheme;
  labelProps?: TextProps;
}) {
  const [time, setTime] = useState('9:00PM');

  return (
    <VStack>
      {label && (
        <Label
          name={name}
          tooltip={tooltip}
          text={label}
          required={required}
          {...labelProps}
        />
      )}
      <SelectInputField
        listCSS={{
          borderTopWidth: '1px',
          borderTopRightRadius: '$2',
          borderTopLeftRadius: '$2',
          ...listCSS,
        }}
        value={time}
        onValueChange={(value) => setTime(value)}
        name='month'
        triggerCSS={triggerCSS}
        options={arrayFrom(24)
          .filter((num) => num >= 12)
          .map((value) => ({
            value,
            label: convertToHour(value),
          }))}
        keySelector={({ value }) => value.toString()}
        labelSelector={({ label }) => label}
        valueSelector={({ value }) => value.toString()}
      />
    </VStack>
  );
}

function CreateMembershipEventPerkPage() {
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
              w={725}
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
                    Add an event perk
                  </Heading>
                  <VStack
                    mt='56px'
                    overflowY='auto'
                    flex={1}
                    css={{ gap: '56px' }}
                  >
                    <VStack gap={4}>
                      <InputTextField
                        placeholder='Enter the title of the event'
                        color='black500'
                        className=''
                        name='title'
                        label='Event Title'
                        labelProps={{
                          color: 'base800',
                        }}
                        required
                      />
                      <InputTextField
                        placeholder='Search for the venue'
                        color='black500'
                        type='search'
                        className=''
                        name='venue'
                        label='Venue'
                        labelProps={{
                          color: 'base800',
                        }}
                        required
                      />
                      <HStack gap={4}>
                        <Box flex={1} minWidth={335}>
                          <DatePicker
                            required
                            label='Event date'
                            labelProps={{
                              color: 'base800',
                            }}
                            triggerCSS={whiteSelectCSS}
                            listCSS={{
                              background: '$white100',
                              color: '$black500',
                            }}
                            min={dayjs().toString()}
                            max={dayjs().add(5, 'y').endOf('y').toString()}
                            name='date'
                            date={dayjs().add(1, 'd').toString()}
                            onChange={(value) => console.log(value)}
                          />
                        </Box>
                        <Box flex={1}>
                          <TimePicker
                            required
                            label='Time'
                            labelProps={{
                              color: 'base800',
                            }}
                            triggerCSS={whiteSelectCSS}
                            listCSS={{
                              background: '$white100',
                              color: '$black500',
                            }}
                            min={dayjs().toString()}
                            max={dayjs().add(5, 'y').toString()}
                            name='date'
                            date={dayjs().add(1, 'd').toString()}
                            onChange={(value) => console.log(value)}
                          />
                        </Box>
                        <SelectInputField
                          required
                          label='Ticketing Provider'
                          labelProps={{
                            color: 'base800',
                          }}
                          listCSS={{
                            borderTopWidth: '1px',
                            borderTopRightRadius: '$2',
                            borderTopLeftRadius: '$2',
                            background: '$white100',
                            color: '$black500',
                          }}
                          // value={time}
                          // onValueChange={(value) => setTime(value)}
                          name='month'
                          triggerCSS={whiteSelectCSS}
                          options={[
                            {
                              value: 'ticketmaster',
                              label: 'Ticketmaster',
                            },
                          ]}
                          keySelector={({ value }) => value}
                          labelSelector={({ label }) => label}
                          valueSelector={({ value }) => value}
                        />
                      </HStack>
                    </VStack>
                    <VStack gap={4}>
                      <InputTextField
                        placeholder='Enter code or paste link'
                        color='black500'
                        className=''
                        name='linkOrCode'
                        label='Promo Code / Link'
                        labelProps={{
                          color: 'base800',
                        }}
                        required
                      />
                      <TextareaField
                        maxLength={500}
                        required
                        minLines={5}
                        maxLines={6}
                        colorTheme='black500'
                        placeholder='Enter code or paste link'
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
                        label='Promo description'
                        labelProps={{
                          color: 'base800',
                        }}
                      />
                    </VStack>
                    <InputTextField
                      placeholder='Paste link to tickets'
                      color='black500'
                      className=''
                      name='url'
                      label='Ticketing URL Link'
                      labelProps={{
                        color: 'base800',
                      }}
                      required
                    />
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

export default CreateMembershipEventPerkPage;
