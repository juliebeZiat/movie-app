import { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useFetchUserList } from "../services/queries";
import userService from "../services/userService";
import { removeMovieInList } from "../state/reducer/app.reducer";
import { padding } from "../styles";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import TextTypography from "../styles/generalStyles/text.typography";

const UserList: FC = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading, isFetching } = useFetchUserList();

  const removeMovie = useMutation(
    async (movie: { movieId: string }) => await userService.removeMovie(movie),
    {
      onSuccess: () => {
        dispatch(removeMovieInList());
        queryClient.invalidateQueries(["userList"]);
      },
    }
  );

  const remove = async(movie: { movieId: string }) => {
    await removeMovie.mutateAsync(movie);
  }
  
  if (!data) return null;
  if (isLoading || isFetching) return <LoadingIndicator />;

  const movies = data.data.detailedMovies;

  return (
    <View style={{ paddingTop: 100, paddingHorizontal: padding.md }}>
      <TextTypography.Title>My list</TextTypography.Title>
      {isSuccess && data ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <>
              <TextTypography.Text>{item.title}</TextTypography.Text>
              <ButtonTypography.Small
                onPress={() => remove({movieId: item._id})}
                // onPress={() => console.log({movieId: item._id})}
              >
                Remove
              </ButtonTypography.Small>
            </>
          )}
        />
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}

export default UserList;