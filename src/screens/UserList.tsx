import { FC } from "react";
import { FlatList, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useFetchUserList } from "../services/queries";
import userService from "../services/userService";
import { removeMovieInList, setUserList } from "../state/reducer/app.reducer";
import { padding } from "../styles";
import { ButtonTypography } from "../styles/generalStyles/buttons.style";
import TextTypography from "../styles/generalStyles/text.typography";

const UserList: FC = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching } = useFetchUserList();
  
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