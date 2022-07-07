import React, { FC, useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../state/store";
import { Endpoints } from "../type/endpoints";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import movieService from "../services/movieService";
import TextTypography from "../styles/generalStyles/text.typography";
import { dimensions, margin, radius } from "../styles";
import { useTheme } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = ({ route }: Props) => {
  const { colors } = useTheme();
  const [movie, setMovie] = useState<Endpoints.GetMovie.Response>();
  const { movieId } = route.params;

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchMovie = async (movieId: string) => {
      const result = await movieService.fetchMovieService(movieId, token);
      setMovie(result.data);
    };
    fetchMovie(movieId);
  }, []);

  if (!movie) {
    return null;
  }

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
            <TextTypography.Caption style={{ marginVertical: margin.tiny }}>{movie.vote_average}</TextTypography.Caption>
            <TextTypography.Text>{movie.overview}</TextTypography.Text>
          </ScrollView>
      </View>
    </ImageBackground>
    </View>
  );
};

export default MovieDetail;