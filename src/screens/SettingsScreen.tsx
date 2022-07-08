import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import * as Icons from "react-native-heroicons/outline";
import { margin, padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { logout, toggleTheme } from "../state/reducer/auth.reducer";
import { useTheme } from "@react-navigation/native";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const isDarkTheme = useSelector((state: RootState) => state.auth.darkTheme);
  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View
      style={{
        paddingTop: 100,
        paddingHorizontal: padding.md,
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View>
        <TextTypography.Title style={{ marginBottom: margin.lg }}>
          Settings
        </TextTypography.Title>
        <TextTypography.Subtitle style={{ marginBottom: margin.md }}>
          Preferences
        </TextTypography.Subtitle>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "darkgrey",
            borderBottomWidth: 0.5,
            paddingBottom: padding.sm,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDarkTheme ? <Icons.SunIcon color={'#ffc87c'} style={{ marginRight: margin.sm }} /> : <Icons.MoonIcon color={'#aa7cff'} style={{ marginRight: margin.sm }} />}
            <TextTypography.Text>Dark Theme</TextTypography.Text>
          </View>
          <Switch
            trackColor={{ false: colors.background, true: colors.text }}
            thumbColor={colors.background}
            ios_backgroundColor={colors.background}
            onValueChange={toggleSwitch}
            value={isDarkTheme}
          />
        </View>
      </View>

      <View style={{ paddingBottom: 80, borderTopColor: 'darkgrey', borderTopWidth: 0.5, paddingTop: padding.lg }}>
        <Pressable onPress={handleLogout} style={{ flexDirection: 'row', alignItems:'center' }}>
          <Icons.LogoutIcon color={ isDarkTheme ? '#7cffde' : '#50b79e' } style={{ marginRight: margin.sm }} />
          <TextTypography.LargeText>Logout</TextTypography.LargeText>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;
