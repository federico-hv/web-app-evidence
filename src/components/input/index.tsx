import { useState, useCallback } from 'react';
import { InputProps } from './input.type';
import { Field } from 'formik';
import { Error } from 'components';
import { StyledInput, StyledInputShowPasswordIcon } from './input.style';
import eyeLock from './../../assets/lock.png';
import eyeOpen from './../../assets/view.png';

export function Input(props: InputProps) {
  const { isPassword, icon, error = null } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <StyledInput>
      <Field type={inputType} {...props} />
      {icon && <span>{icon}</span>}
      {isPassword && (
        <StyledInputShowPasswordIcon onClick={handleShowPassword}>
          <img src={showPassword ? eyeOpen : eyeLock} />
        </StyledInputShowPasswordIcon>
      )}
      <Error error={error} />
    </StyledInput>
  );
}
