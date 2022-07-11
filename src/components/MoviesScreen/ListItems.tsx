import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { color, font, margin, padding, radius } from "../../styles";
import TextTypography from "../../styles/generalStyles/text.typography";
import { Movie } from "../../type/movie";
import { Nav } from "../../type/Nav";

interface IListItems {
  allMoviesList: Movie[]
}

export const ListItems: FC<IListItems> = ({ allMoviesList }: IListItems) => {
  const { navigate } = useNavigation<Nav>();

  return (
    <>
      <TextTypography.Subtitle style={{ marginVertical: margin.sm }}>
        Movies
      </TextTypography.Subtitle>

      <FlatList
        data={allMoviesList?.slice(1, allMoviesList.length)}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
        style={{ height: 350 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate("Movie", { movieId: item._id })}
          >
            <View style={{ marginBottom: margin.lg }}>
              <Image
                style={{
                  width: 160,
                  height: 160,
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
                <Text
                  style={{
                    fontSize: font.md,
                    fontWeight: "bold",
                    color: color.light,
                    marginBottom: margin.xtiny,
                  }}
                >
                  {item.title.split(" ").slice(0, 2).join(" ")}
                  {item.title.split(" ").length > 1 ? "..." : ""}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {item.genre_ids.map((genre) => {
                    return (
                      <TextTypography.Caption
                        style={{ color: color.light }}
                        key={genre.id}
                      >
                        {genre.name.toUpperCase() + " "}
                      </TextTypography.Caption>
                    );
                  })}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
