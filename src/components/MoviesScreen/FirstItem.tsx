import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color, font, margin, radius } from "../../styles";
import { ButtonTypography } from "../../styles/generalStyles/buttons.style";
import TextTypography from "../../styles/generalStyles/text.typography";

import { Movie } from "../../type/movie";
import { Nav } from "../../type/Nav";

interface IItem {
  allMoviesList: Movie[]
}

export const FirstItemMoviesScreen: FC<IItem> = ({ allMoviesList }: IItem) => {
  const { navigate } = useNavigation<Nav>();
  return (
    <TouchableOpacity
      onPress={() => navigate("Movie", { movieId: allMoviesList[0]._id })}
    >
      <Image
        style={{
          height: 220,
          borderRadius: radius.xlg,
          overflow: "hidden",
        }}
        source={{ uri: allMoviesList[0].poster_path }}
      />
      <View style={{ position: "absolute", bottom: 20, left: 15, right: 15 }}>
        <TextTypography.Subtitle
          style={{ color: color.light, marginBottom: margin.tiny }}
        >
          {allMoviesList[0].title}
        </TextTypography.Subtitle>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: margin.sm,
          }}
        >
          {allMoviesList[0].genres.map((genre) => {
            return (
              <TextTypography.Caption
                style={{ color: color.light, fontSize: font.sm }}
                key={genre.id}
              >
                {genre.name.toUpperCase() + " "}
              </TextTypography.Caption>
            );
          })}
        </View>
        <ButtonTypography.Small
          onPress={() => navigate("Movie", { movieId: allMoviesList[0]._id })}
          style={{ backgroundColor: "#E50909" }}
        >
          <Text>Details</Text>
        </ButtonTypography.Small>
      </View>
    </TouchableOpacity>
  );
};