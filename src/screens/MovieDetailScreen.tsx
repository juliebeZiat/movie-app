import React, { FC } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import TextTypography from "../styles/generalStyles/text.typography";
import { dimensions, margin, radius, color } from "../styles";

import { countStars } from "../functions/convertNoteToStars";
import { LoadingIndicator } from "../components/LoadingIndicator";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

import { useFetchMovieQuery, useFetchUserList } from "../services/queries";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import { useMutation, useQueryClient } from "react-query";
import userService from "../services/userService";
import { useRoute, useTheme } from "@react-navigation/native";

import { PlusIcon } from "react-native-heroicons/solid";
import { CheckIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { addMovieInList, removeMovieInList } from "../state/reducer/app.reducer";
import { RootState } from "../state/store";


type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const MovieDetail: FC<Props> = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const queryClient = useQueryClient();

  // Fetch movie detail
  const { params: { movieId } } = useRoute<Props['route']>();
  const { data, isLoading, isSuccess, isFetching } = useFetchMovieQuery(movieId);

  // ** ADD/REMOVE
  // State of movie : is in user list or not
  const isMovieInList = useSelector((state: RootState) => state.app.movies.includes(movieId));

  // Add movie
  const addMovie = useMutation(
    async (movie: { movieId: string }) => await userService.addMovie(movie)
  );
  
  const add = async(movie: { movieId: string }) => {
    await addMovie.mutateAsync(movie, {
      onSuccess: () => {
        dispatch(addMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      },
    });
  }

  // Remove movie
  const removeMovie = useMutation(
    async (movie: { movieId: string }) => await userService.removeMovie(movie)
  );

  const remove = async(movie: { movieId: string }) => {
    await removeMovie.mutateAsync(movie, {
      onSuccess: () => {
        dispatch(removeMovieInList(movieId));
        queryClient.invalidateQueries(["userList"]);
      },
    });
  }
  // ***

  // Fetch data
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

            {!isMovieInList ? (
              <ButtonTypography.Icon onPress={() => add({movieId: movie._id})}>
                <PlusIcon color={color.light} />
              </ButtonTypography.Icon>
            ) : (
              <ButtonTypography.Icon onPress={() => remove({movieId: movie._id})}>
                <CheckIcon color={color.light} />
              </ButtonTypography.Icon>
            )}
            
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
                marginVertical: margin.xxlg,
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
