import {
  useState,
  Fragment,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { InputProps } from './input.type';
import { Field } from 'formik';
import {
  StyledInput,
  StyledInputEmailIcon,
  StyledInputPasswordIcon,
  StyledInputShowPasswordIcon,
  StyledPasswordError,
  StyledEmailError,
} from './input.style';
import eyeLock from './../../assets/lock.png';
import eyeOpen from './../../assets/view.png';
import passwordIcon from './../../assets/password.png';
import emailIcon from './../../assets/email.png';

export function Input({
  name,
  isPassword,
  autoComplete,
  value,
  onChange,
  error,
  placeholder,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const detectFocus = useCallback((event: string | number | null) => {
    setFocused(event === 'focus');
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const inputProps = useMemo(
    () => ({
      type: isPassword && !showPassword ? 'password' : 'text',
      autoComplete: autoComplete || 'off',
      name,
      placeholder,
      error,
      value,
      onChange,
      onFocus: detectFocus,
      onBlur: detectFocus,
    }),
    [
      autoComplete,
      detectFocus,
      isPassword,
      error,
      name,
      onChange,
      placeholder,
      showPassword,
      value,
    ],
  );

  return (
    <StyledInput>
      <Field {...inputProps} />
      {isPassword ? (
        <Fragment>
          <StyledInputPasswordIcon>
            <img src={passwordIcon} alt='Password Icon' />
          </StyledInputPasswordIcon>
        </Fragment>
      ) : (
        <StyledInputEmailIcon>
          <img src={emailIcon} alt='Email Icon' />
        </StyledInputEmailIcon>
      )}
      {isPassword && (
        <StyledInputShowPasswordIcon onClick={handleShowPassword}>
          {showPassword ? <img src={eyeOpen} /> : <img src={eyeLock} />}
        </StyledInputShowPasswordIcon>
      )}
      {error?.includes('password') && (
        <StyledPasswordError>{error}</StyledPasswordError>
      )}
      {error?.includes('email') && (
        <StyledEmailError>{error}</StyledEmailError>
      )}
    </StyledInput>
  );
}
