import React, { FC } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { StarIcon as StarIconOutline } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";

import { RootState } from "../state/store";


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import movieService from "../services/movieService";
import TextTypography from "../styles/generalStyles/text.typography";
import { dimensions, margin, radius } from "../styles";
import { useTheme } from "@react-navigation/native";
import { useQuery } from "react-query";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = ({ route }: Props) => {
  const { colors } = useTheme();
  const { movieId } = route.params;

  const token = useSelector((state: RootState) => state.auth.token);

  const result = async() => await movieService.fetchMovieService(movieId, token);
  const query = useQuery(['movie'], result);
  const movie = query.data?.data;

  if (!movie) {
    return null;
  }

  const totalStars = 5;

  const countStars = (note: number) => {
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

  return (
    <View style={{ backgroundColor: colors.background }}>
    <ImageBackground
      source={{ uri: movie.poster_path }}
      resizeMode="cover"
      blurRadius={10}
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={{ height: dimensions.fullHeight, marginTop: 100 }}>
          <View style={{ alignItems: 'center', margin: margin.md }}>
            <Image
              style={{ width: 200, height: 350, borderRadius: radius.xlg }}
              source={{
                uri: movie.poster_path,
              }}
            />
          </View>
          <ScrollView style={{ margin: margin.sm }}>
            <TextTypography.Subtitle>{movie.title}</TextTypography.Subtitle>
            <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: margin.tiny }}>
              <TextTypography.Caption>{new Date(movie.release_date).getFullYear() + ' - '}</TextTypography.Caption>
                {movie.genre_ids.map((genre) => {
                  return <TextTypography.Caption key={genre.id}>
                    {genre.name.toUpperCase() + ' '}
                  </TextTypography.Caption>;
                })}
            </View>
            <View style={{ flexDirection: 'row', marginVertical: margin.sm }}>
              {countStars(Math.round(movie.vote_average/2))}
            </View>
            <TextTypography.Text>{movie.overview}</TextTypography.Text>
          </ScrollView>
      </View>
    </ImageBackground>
    </View>
  );
};

export default MovieDetail;