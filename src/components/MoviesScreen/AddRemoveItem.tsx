import React, { FC } from "react";
import { PressableProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useAppTheme } from "../../hooks/useAppTheme";
import { color } from "../../styles";

type Props = {
  onPress(): void
}

export const AddItem = ({onPress}: Props) => {
  const { theme, isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <PlusCircleIcon
        color={
          isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
            ? color.offwhite
            : color.dark
        }
        size={42}
      />
    </TouchableOpacity>
  );
}

export const RemoveItem = ({onPress}: Props) => {
  const { theme, isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <CheckCircleIcon
        color={
          isDarkTheme || (isSystemThemeEnabled && scheme === "dark")
            ? color.green
            : color.darkgreen
        }
        size={42}
      />
    </TouchableOpacity>
  );
}