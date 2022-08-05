import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { FlatList, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { XCircleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useMutationRemoveMovie } from "../../services/mutations";
import { useFetchUserList } from "../../services/queries";
import { color, margin, padding, radius } from "../../styles";
import TextTypography from "../../styles/generalStyles/text.typography";
import { Nav } from "../../type/Nav";

const UserList: FC = () => {
  const { navigate } = useNavigation<Nav>();
  const { data, isSuccess, isLoading, isFetching } = useFetchUserList();

  const { mutateAsync: mutateRemove } = useMutationRemoveMovie();

  const remove = async(movieId: string) => {
    await mutateRemove(movieId);
  }
  
  if (!data) return null;

  if (isLoading || isFetching) return <LoadingIndicator />;

  const movies = data.data.detailedMovies;

  return (
    <SafeAreaView>
      <TextTypography.PageTitle>My list</TextTypography.PageTitle>
      {isSuccess && data ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          style={{ paddingTop: padding.sm, paddingHorizontal: padding.md }}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigate("Movie", { movieId: item._id })}
              >
                <View style={{ marginVertical: margin.sm }}>
                  <Image
                    style={{
                      width: 320,
                      height: 80,
                      borderRadius: radius.xlg,
                      overflow: "hidden",
                      marginRight: margin.tiny
                    }}
                    source={{ uri: item.backdrop_path }} 
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      right: 8,
                    }}
                  >
                    <TextTypography.Text
                      style={{
                        textShadowColor: color.dark,
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 7,
                        color: color.light
                      }}
                    >
                      {item.title}
                    </TextTypography.Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item._id)}>
                <XCircleIcon size={30} color={color.orange} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}

export default UserList;