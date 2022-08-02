import { FC, useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQueries } from "react-query";
import { LoadingIndicator } from "../components/LoadingIndicator";
import UserListMovieDetails from "../components/UserListMovieDetails";
import { useQueriesTyped } from "../hooks/useQueryTyped";
import movieService from "../services/movieService";
import { useFetchMovieQuery, useFetchUserList, useMovieDetailsForUserList } from "../services/queries";
import { padding } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";
import { Endpoints } from "../type/endpoints";
import { Movie } from "../type/movie";
import { TUserList } from "../type/userlist";


const UserList: FC = () => {
  const { data: userList, isSuccess } = useFetchUserList();
  const userListMovies = userList?.data.list.movies;
  
  const useMovieDetailsForUserList = (userList: TUserList) => {
    return useQueriesTyped(
      userListMovies?.map((movie: {movie: string}) => {
        return {
          queryKey: ["movie", movie.movie],
          queryFn: async () => await movieService.fetchMovieService(movie.movie),
          enabled: !!userList,
        };
      }) ?? []
    );
  }

  const data = useMovieDetailsForUserList(userListMovies);
  const success = data.some((d) => d.isFetching);

  if(success) {
    return [];
  }
  
  const movies = data.map((movie) => movie.data.data);
  
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: padding.md }}>
      <TextTypography.Title>My list</TextTypography.Title>

      {isSuccess && userList ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <>
            <TextTypography.Text>{item.title}</TextTypography.Text>
            <Text>Coucou</Text>
            </>
          )}
          />
      ) : (
        <LoadingIndicator />
      )}
    </View>
  )
}

export default UserList;