import { useState, useEffect } from 'react';

const useValidatePassword = (password) => {
  const [error, setError] = useState(null);

  const validatePasswordFormat = (userPassword) => {
    const regEx = /(?=.{4,}$)(?=.*[A-Z])(?=.*[0-9])/;
    if (regEx.test(userPassword)) {
      return true;
    }
    return false;
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
