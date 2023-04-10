import { Input } from 'components';
import { Button } from 'components';
import { StepProps } from 'shared';
import personIcon from '../../../../../assets/person.png';

export function StepThree({ values, errors, setPage }: StepProps) {
  return (
    <>
      <Input
        value={values.artistName}
        error={errors.artistName}
        name='displayName'
        placeholder='Artist Name'
        icon={<img src={personIcon} />}
      />
      <Input
        value={values.username}
        error={errors.username}
        name='username'
        placeholder='Username'
        icon={<img src={personIcon} />}
      />
      <Button
        type='button'
        class={
          values.artistName &&
          !errors.artistName &&
          values.username &&
          !errors.username
            ? 'primary'
            : 'disabled'
        }
        onClick={() => setPage(3)}
      >
        Next
      </Button>
    </>
  );
}
