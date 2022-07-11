import { StarIcon } from "react-native-heroicons/solid";
import { StarIcon as StarIconOutline } from "react-native-heroicons/outline";
import { useTheme } from "@react-navigation/native";

const totalStars = 5;

export const countStars = (note: number) => {
  const { colors } = useTheme();
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    if (i < note) {
      stars.push(<StarIcon key={i} color="#E2CF5D" />);
    } else {
      stars.push(<StarIconOutline key={i} color={colors.text} />);
    }
  }
  return stars;
};
