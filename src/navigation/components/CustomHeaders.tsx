import React, { FC } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { LargeLogo } from "../../styles/generalStyles/logo.style";
import { margin, padding } from "../../styles";
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

export const NavMovieDetail: FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation<Nav>();
  
  return (
    <View style={{ width: 50, marginTop: 60, marginLeft: 10 }}>
      <TouchableOpacity onPress={() => goBack()}>
        <ChevronLeftIcon color={colors.text} size={25} />
      </TouchableOpacity>
    </View>
  )
}