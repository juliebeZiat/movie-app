import React, { FC } from "react";
import { View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { margin, padding } from "../styles";
import * as Icons from "react-native-heroicons/outline";
import TextTypography from "../styles/generalStyles/text.typography";
import { Switch } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";


export const SwitchSystemTheme: FC = () => {

  const { toggleSystemTheme, isSystemThemeEnabled } = useAppTheme();
  const { colors } = useTheme();

  return (
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
            trackColor={{ false: "#b4b4b4", true: "#ffc87c" }}
            thumbColor={"#f8f8f8"}
            onValueChange={toggleSystemTheme}
            value={isSystemThemeEnabled}
          />
        </View>
  )
}

export const SwitchDarkTheme: FC = () => {
  const { isSystemThemeEnabled, isDarkTheme, toggleTheme } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isDarkTheme ? (
          <Icons.SunIcon color={"#ffc87c"} style={{ marginRight: margin.sm }} />
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
        trackColor={{ false: "#b4b4b4", true: "#ffc87c" }}
        thumbColor={"#f8f8f8"}
        onValueChange={toggleTheme}
        value={isDarkTheme}
        disabled={isSystemThemeEnabled}
      />
    </View>
  );
}