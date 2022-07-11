import React, { FC } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { LargeLogo, Logo } from "./logo.style";
import * as Icons from "react-native-heroicons/solid";
import { padding } from "..";
import { Nav } from "../../type/Nav";

export const NavStyleLogout: FC = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 100,
        paddingTop: padding.xlg,
        paddingLeft: padding.md,
        backgroundColor: colors.background,
        flexDirection: "row",
        justifyContent: 'space-between'
      }}
    >
      <LargeLogo />
    </View>
  );
};

export const NavStyleLogin: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 100,
        paddingTop: padding.xlg,
        paddingLeft: padding.md,
        backgroundColor: colors.background,
        flexDirection: "row",
        justifyContent: 'space-between'
      }}
    >
      <Logo />
      <Pressable onPress={() => navigate("Settings")} style={{ padding: padding.xlg }}>
        <Icons.CogIcon color={colors.text} />
      </Pressable>
    </View>
  );
};
