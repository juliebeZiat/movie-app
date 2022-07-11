import React, { FC } from "react";
import { View } from "react-native";
import { dimensions } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

import movieService from "../services/movieService";

import { FirstItemMoviesScreen } from "../components/MoviesScreen/FirstItem";
import { ListItems } from "../components/MoviesScreen/ListItems";
import { useQuery } from "react-query";
import { IQueryAllMovies } from "../type/queries";
import { LoadingIndicator } from "../components/LoadingIndicator";

const Welcome: FC = () => {
  const fetchAllMovies = async () => {
    const result = await movieService.fetchAllMoviesService();
    return result;
  };

  const { data, isLoading, isSuccess, isFetching } = useQuery<IQueryAllMovies, Error>(["movies"], fetchAllMovies);

  if (!data) return null;
  if (isLoading || isFetching) return <LoadingIndicator />;

  const allMoviesList = data.data;

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {isSuccess && data ? (
        <SafeAreaView style={{ width: dimensions.fullWidth - 50 }}>
          <FirstItemMoviesScreen allMoviesList={allMoviesList} />
          <ListItems allMoviesList={allMoviesList} />
        </SafeAreaView>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
};

export default Welcome;
