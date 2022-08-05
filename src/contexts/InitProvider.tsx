import { API_URL } from "@env";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


import { useSelector } from "react-redux";
import { useAppTheme } from "../hooks/useAppTheme";
import { RootState } from "../state/store";

const InitProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme || (isSystemThemeEnabled && scheme === "dark") ? "black" : "white" }}>
      {children}
    </SafeAreaView>
  )
}

export default InitProvider;
