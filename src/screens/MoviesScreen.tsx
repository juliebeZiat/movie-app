import React, { FC } from "react";
import { View } from "react-native";
import { dimensions } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

import { FirstItemMoviesScreen } from "../components/MoviesScreen/FirstItem";
import { ListItems } from "../components/MoviesScreen/ListItems";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useFetchAllMoviesQuery } from "../services/queries";

const Welcome: FC = () => {
  const { data, isLoading, isSuccess, isFetching } = useFetchAllMoviesQuery();

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
