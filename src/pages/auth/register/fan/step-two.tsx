import { Input } from 'components';
import { Button } from 'components';
import { StepProps } from 'shared';
import personIcon from '../../../../assets/person.png';
import dateIcon from '../../../../assets/date.png';
import { DateInput } from './index.styles';

export function StepTwo({ values, errors, setPage }: StepProps) {
  return (
    <DateInput>
      <Input
        value={values.name}
        error={errors.name}
        name='name'
        placeholder='Name'
        icon={<img src={personIcon} />}
      />
      <Input
        value={values.dateOfBirth}
        error={errors.dateOfBirth}
        name='dateOfBirth'
        placeholder='Date of Birth'
        icon={<img src={dateIcon} />}
        type='date'
      />
      <Button
        class={
          values.email &&
          !errors.email &&
          values.dateOfBirth &&
          !errors.dateOfBirth
            ? 'primary'
            : 'disabled'
        }
        type='button'
        onClick={() => setPage(2)}
      >
        Next
      </Button>
    </DateInput>
  );
}
