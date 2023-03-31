import { useState, useCallback } from 'react';
import { InputProps } from './input.type';
import { Field } from 'formik';
import { Error } from 'components';
import { StyledInput, StyledInputShowPasswordIcon } from './input.style';
import eyeLock from './../../assets/lock.png';
import eyeOpen from './../../assets/view.png';

export function Input({
  name,
  isPassword,
  autoComplete,
  value,
  onChange,
  error = null,
  icon,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <StyledInput>
      <Field
        type={inputType}
        autoComplete={autoComplete || 'off'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
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
