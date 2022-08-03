import React, { FC } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { LargeLogo, Logo } from "./logo.style";
import * as Icons from "react-native-heroicons/solid";
import { margin, padding } from "..";
import { Nav } from "../../type/Nav";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    </View>
  );
};

export const NavMovieDetail: FC = () => {
  const { goBack } = useNavigation<Nav>();
  const { colors } = useTheme();

  return (
    <View style={{
      marginTop: 55,
      marginLeft: margin.tiny,
    }}>
      <TouchableOpacity onPress={() => goBack()}>
        <ChevronLeftIcon color={colors.text} size={25} />
      </TouchableOpacity>
    </View>
  )
}


