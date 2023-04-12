import { Input } from 'components';
import { Button } from 'components';
import { StepProps } from 'shared';
import personIcon from '../../../../../assets/person.png';
import dateIcon from '../../../../../assets/date.png';
import { DateInput } from '../index.styles';

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
        value={values.birthday}
        error={errors.birthday}
        name='birthday'
        placeholder='Date of Birth'
        icon={<img src={dateIcon} />}
        type='date'
      />
      <Button
        class={
          values.email &&
          !errors.email &&
          values.birthday &&
          !errors.birthday
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
