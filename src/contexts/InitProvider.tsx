import { API_URL } from "@env";
import axios from "axios";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const InitProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    axios.defaults.baseURL = API_URL;
    if (token) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <></>
  }

  return (
    <>
      {children}
    </>
  )
}

export default InitProvider;
