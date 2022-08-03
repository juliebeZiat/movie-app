import { StarIcon } from "react-native-heroicons/solid";
import { StarIcon as StarIconOutline } from "react-native-heroicons/outline";
import { color } from "../styles";

const totalStars = 5;

export const countStars = (note: number) => {
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    if (i < note) {
      stars.push(<StarIcon key={i} color="#E2CF5D" />);
    } else {
      stars.push(<StarIconOutline key={i} color={color.dark} />);
    }
  }
  return stars;
};
