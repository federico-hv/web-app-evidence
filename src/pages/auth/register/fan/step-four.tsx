import { Input } from 'components';
import { Button } from 'components';
import { StepProps } from 'shared';
import passwordIcon from '../../../../assets/password.png';

export function StepFour({
  values,
  errors,
  setPage,
  isSubmitting,
}: StepProps) {
  return (
    <>
      <Input
        value={values.password}
        error={errors.password}
        isPassword
        name='password'
        placeholder='Password'
        icon={<img src={passwordIcon} />}
      />
      <Input
        value={values.confirmPassword}
        error={errors.confirmPassword}
        isPassword
        name='confirmPassword'
        placeholder='Confirm Password'
        icon={<img src={passwordIcon} />}
      />
      <Button
        class={
          !isSubmitting ||
          (values.password &&
            !errors.password &&
            values.confirmPassword &&
            !errors.confirmPassword)
            ? 'primary'
            : 'disabled'
        }
        type='submit'
        onClick={() => setPage(3)}
      >
        Submit
      </Button>
    </>
  );
}
