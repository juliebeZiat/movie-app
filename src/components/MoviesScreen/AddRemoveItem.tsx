import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useAppTheme } from "../../hooks/useAppTheme";
import { color } from "../../styles";

type TouchableProp = {
  onPress(): void
}

export const AddItem: FC<TouchableProp> = ({onPress}: TouchableProp) => {
  const { isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
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

export const RemoveItem = ({onPress}: TouchableProp) => {
  const { isDarkTheme, scheme, isSystemThemeEnabled } = useAppTheme();
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