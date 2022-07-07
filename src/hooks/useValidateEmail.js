import { useState, useEffect } from 'react';

//! Do not need it anymore => react-hook-form/yup

const useValidateEmail = (email) => {
  const [error, setError] = useState(null);

  const validateEmailFormat = (userEmail) => {
    // eslint-disable-next-line no-useless-escape
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(userEmail);
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
