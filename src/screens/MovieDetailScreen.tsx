import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useRoute, useTheme } from "@react-navigation/native";
import { useFetchMovieQuery } from "../services/queries";
import { useMutationAddMovie, useMutationRemoveMovie } from "../services/mutations";

import { Image, ImageBackground, ScrollView, View } from "react-native";
import { dimensions, margin, radius } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";

import { AddItem, RemoveItem } from "../components/MoviesScreen/AddRemoveItem";

import { countStars } from "../functions/convertNoteToStars";
import { LoadingIndicator } from "../components/LoadingIndicator";

import { logSelector } from "../state/reducer/auth.reducer";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { RootState } from "../state/store";


type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = () => {
  const { colors } = useTheme();

  const { params: { movieId } } = useRoute<Props['route']>();
  const { data, isLoading, isSuccess, isFetching } = useFetchMovieQuery(movieId);

  const isLogged = useSelector(logSelector);
  const isMovieInList = useSelector((state: RootState) => state.movie.movies.includes(Number(movieId)));

  const { mutateAsync: mutateAdd } = useMutationAddMovie(movieId);
  const { mutateAsync: mutateRemove } = useMutationRemoveMovie(movieId);
  
  //! TYPAGE
  const add = async(movieId: string) => {
    await mutateAdd(movieId);
  }

  const remove = async(movieId: void) => {
    await mutateRemove(movieId);
  }

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
            <View style={{ alignItems: "flex-end", marginRight: margin.md }}>
              {isLogged && (!isMovieInList ? (
                <AddItem onPress={() => add(movie._id)} />
              ) : (
                <RemoveItem onPress={() => remove(movie._id)} />
              ))}
            </View>
            
            <View style={{ alignItems: "center", margin: margin.md }}>
              <Image
                style={{ width: 200, height: 350, borderRadius: radius.xlg }}
                source={{
                  uri: movie.poster_path,
                }}
              />
            </View>
            <ScrollView
              style={{
                marginHorizontal: margin.sm,
                marginVertical: margin.xlg,

              }}
            >
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
                {movie.genres.map((genre) => {
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
