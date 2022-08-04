import React, { FC } from "react";
import { View } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { color, margin, padding } from "../../../styles";
import * as Icons from "react-native-heroicons/outline";
import TextTypography from "../../../styles/generalStyles/text.typography";
import { Switch } from "react-native-gesture-handler";

export const SwitchSystemTheme: FC = () => {
  const { toggleSystemTheme, isSystemThemeEnabled } = useAppTheme();

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
            color={color.orange}
            style={{ marginRight: margin.sm }}
          />
        ) : (
          <Icons.CubeIcon
            color={color.purple}
            style={{ marginRight: margin.sm }}
          />
        )}
        <TextTypography.Text>System Theme</TextTypography.Text>
      </View>
      <Switch
        trackColor={{ false: color.lightgrey, true: color.orange }}
        thumbColor={color.offwhite}
        onValueChange={toggleSystemTheme}
        value={isSystemThemeEnabled}
      />
    </View>
  );
};

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
          <Icons.SunIcon color={color.orange} style={{ marginRight: margin.sm }} />
        ) : (
          <Icons.MoonIcon
            color={!isSystemThemeEnabled ? color.purple : color.darkpurple}
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
        trackColor={{ false: color.lightgrey, true: color.orange }}
        thumbColor={color.offwhite}
        onValueChange={toggleTheme}
        value={isDarkTheme}
        disabled={isSystemThemeEnabled}
      />
    </View>
  );
};
