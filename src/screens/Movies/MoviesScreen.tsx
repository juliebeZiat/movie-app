import React, { FC } from "react";
import { View } from "react-native";
import { dimensions, margin } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";

// import { FirstItemMoviesScreen } from "./components/FirstItem";
import { ListItems } from "./components/ListItems";

import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useFetchAllMoviesQuery } from "../../services/queries";

const Movies: FC = () => {
  const { data, isLoading, isSuccess, isFetching } = useFetchAllMoviesQuery();

  if (!data) return null;
  if (isLoading || isFetching) return <LoadingIndicator />;

  const allMoviesList = data.data;

  return (
    <View style={{ alignItems: "center" }}>
      {isSuccess && data ? (
        <View style={{ width: dimensions.fullWidth - 50 }}>
          {/* <FirstItemMoviesScreen allMoviesList={allMoviesList} /> */}
          <ListItems allMoviesList={allMoviesList} />
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
};

export default Movies;
