import { useState } from 'react';

interface UseInputReturn {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  valueChangeManual: (val: string) => void;
  defaultValueHandler: (val: string) => void;
  inputBlurHandler: (event: React.SyntheticEvent) => void;
  reset: () => void;
}

const useInput = (validateValue: Function): UseInputReturn => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isValid = validateValue(value);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const valueChangeManual = (val: string) => {
    setValue(val);
  };

  const defaultValueHandler = (val: string) => {
    setValue(val);
  };

  const inputBlurHandler = (event: React.SyntheticEvent): void => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    valueChangeHandler,
    valueChangeManual,
    defaultValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
