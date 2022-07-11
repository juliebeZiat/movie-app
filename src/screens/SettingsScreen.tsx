import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import * as Icons from "react-native-heroicons/outline";
import { margin, padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";
import { useDispatch } from "react-redux";

import { logout } from "../state/reducer/auth.reducer";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "../hooks/useAppTheme";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { toggleSystemTheme, toggleTheme, isSystemThemeEnabled, isDarkTheme } = useAppTheme();
  
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

        {/* System theme */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: padding.sm,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isSystemThemeEnabled ? (
              <Icons.CubeIcon
                color={"#ffc87c"}
                style={{ marginRight: margin.sm }}
              />
            ) : (
              <Icons.CubeIcon
                color={"#aa7cff"}
                style={{ marginRight: margin.sm }}
              />
            )}
            <TextTypography.Text>System Theme</TextTypography.Text>
          </View>
          <Switch
            trackColor={{ false: colors.background, true: colors.text }}
            thumbColor={colors.background}
            ios_backgroundColor={colors.background}
            onValueChange={toggleSystemTheme}
            value={isSystemThemeEnabled}
          />
        </View>

        {/* Dark / light theme  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDarkTheme ? (
              <Icons.SunIcon
                color={"#ffc87c"}
                style={{ marginRight: margin.sm }}
              />
            ) : (
              <Icons.MoonIcon
                color={!isSystemThemeEnabled ? "#aa7cff" : "#776992"}
                style={{ marginRight: margin.sm }}
              />
            )}
            {!isSystemThemeEnabled ? (
              <TextTypography.Text>Dark Theme</TextTypography.Text>
            ) : (
              <TextTypography.Disabled>Dark Theme</TextTypography.Disabled>
            )}
          </View>
          <Switch
            trackColor={{ false: colors.background, true: colors.text }}
            thumbColor={colors.background}
            ios_backgroundColor={colors.background}
            onValueChange={toggleTheme}
            value={isDarkTheme}
            disabled={isSystemThemeEnabled}
          />
        </View>
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
