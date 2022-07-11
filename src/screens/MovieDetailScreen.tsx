import React, { FC } from "react";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import TextTypography from "../styles/generalStyles/text.typography";
import { dimensions, margin, radius } from "../styles";

import { countStars } from "../functions/convertNoteToStars";
import { LoadingIndicator } from "../components/LoadingIndicator";

import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

import { IQueryMovie } from "../type/queries";
import { useQuery } from "react-query";
import movieService from "../services/movieService";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = ({ route }: Props) => {
  const { colors } = useTheme();
  const { movieId } = route.params;

  const fetchMovie = async (movieId: string) => {
    const result = await movieService.fetchMovieService(movieId);
    return result;
  };

  const { data, isLoading, isSuccess, isFetching } = useQuery<IQueryMovie, Error>(
    ["movie", movieId],
    () => fetchMovie(movieId)
  );

  if (!data) return null;
  if (isLoading || isFetching) return <LoadingIndicator />;

  const movie = data.data;

  return (
    <View style={{ backgroundColor: colors.background }}>
      {isSuccess && data ? (
        <ImageBackground
          source={{ uri: movie.poster_path }}
          resizeMode="cover"
          blurRadius={10}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={{ height: dimensions.fullHeight, marginTop: 100 }}>
            <View style={{ alignItems: "center", margin: margin.md }}>
              <Image
                style={{ width: 200, height: 350, borderRadius: radius.xlg }}
                source={{
                  uri: movie.poster_path,
                }}
              />
            </View>
            <ScrollView style={{ margin: margin.sm }}>
              <TextTypography.Subtitle>{movie.title}</TextTypography.Subtitle>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: margin.tiny,
                }}
              >
                <TextTypography.Caption>
                  {new Date(movie.release_date).getFullYear() + " - "}
                </TextTypography.Caption>
                {movie.genre_ids.map((genre) => {
                  return (
                    <TextTypography.Caption key={genre.id}>
                      {genre.name.toUpperCase() + " "}
                    </TextTypography.Caption>
                  );
                })}
              </View>
              <View style={{ flexDirection: "row", marginVertical: margin.sm }}>
                {countStars(Math.round(movie.vote_average / 2))}
              </View>
              <TextTypography.Text>{movie.overview}</TextTypography.Text>
            </ScrollView>
          </View>
        </ImageBackground>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
};

export default MovieDetail;
