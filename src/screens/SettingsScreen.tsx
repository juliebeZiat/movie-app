import React, { FC } from "react";
import { Pressable, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { margin, padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";
import { useDispatch } from "react-redux";

import { logout } from "../state/reducer/auth.reducer";
import { useAppTheme } from "../hooks/useAppTheme";
import { SwitchDarkTheme, SwitchSystemTheme } from "../components/SwitchTheme";

const Settings: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { isDarkTheme } = useAppTheme();
  
  return (
    <View
      style={{
        paddingTop: 100,
        paddingHorizontal: padding.md,
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View
        style={{
          borderBottomColor: "darkgrey",
          borderBottomWidth: 0.5,
          paddingBottom: padding.lg,
        }}
      >
        <TextTypography.Title style={{ marginBottom: margin.lg }}>
          Settings
        </TextTypography.Title>
        <TextTypography.Subtitle style={{ marginBottom: margin.md }}>
          Preferences
        </TextTypography.Subtitle>

        <SwitchSystemTheme />
        <SwitchDarkTheme />
      </View>

      <View
        style={{
          paddingBottom: 80,
          borderTopColor: "darkgrey",
          borderTopWidth: 0.5,
          paddingTop: padding.lg,
        }}
      >
        <Pressable
          onPress={handleLogout}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Icons.LogoutIcon
            color={isDarkTheme ? "#7cffde" : "#50b79e"}
            style={{ marginRight: margin.sm }}
          />
          <TextTypography.LargeText>Logout</TextTypography.LargeText>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;
