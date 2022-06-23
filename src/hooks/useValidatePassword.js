import { useState, useEffect } from 'react';

export const useValidatePassword = (password) => {
  const [error, setError] = useState(null);

  const validatePasswordFormat = (userPassword) => {
    const regEx = /(?=.{4,}$)(?=.*[A-Z])(?=.*[0-9])/;
    return regEx.test(userPassword);
  };

  useEffect(() => {
    if (!validatePasswordFormat(password)) {
      setError('Password must be longer than or equal to 4 characters and must contain one uppercase and one number');
    } else {
      setError('');
    }
  }, [password]);
  return error;
};

export default useValidatePassword;
