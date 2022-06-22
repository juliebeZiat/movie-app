import { useState, useEffect } from 'react';

const useValidateEmail = (email) => {
  const [error, setError] = useState(null);

  // eslint-disable-next-line no-useless-escape
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateEmailFormat = (userEmail) => {
    if (regEx.test(userEmail)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!validateEmailFormat(email)) {
      setError('Email must be an email');
    } else {
      setError('');
    }
  }, [email]);

  return error;
};

export default useValidateEmail;
