import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useFetchUserList } from "../services/queries";
import { color, dimensions, font, margin, padding, radius } from "../styles";
import TextTypography from "../styles/generalStyles/text.typography";
import { Nav } from "../type/Nav";

const UserList: FC = () => {
  const { navigate } = useNavigation<Nav>();
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
            <TouchableOpacity
              onPress={() => navigate("Movie", { movieId: item._id })}
            >
              <View style={{ marginVertical: margin.sm }}>
                <Image
                  style={{
                    width: 350,
                    height: 80,
                    borderRadius: radius.xlg,
                    overflow: "hidden",
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
                      textShadowRadius: 7
                    }}
                  >
                    {item.title}
                  </TextTypography.Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}

export default UserList;