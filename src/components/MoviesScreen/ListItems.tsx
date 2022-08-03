import { Picker } from "@react-native-picker/picker";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getGenreArray } from "../../functions/getGenreArray";
import { color, font, margin, radius } from "../../styles";
import TextTypography from "../../styles/generalStyles/text.typography";
import { Movie } from "../../type/movie";
import { Nav } from "../../type/Nav";

interface IListItems {
  allMoviesList: Movie[]
}

export const ListItems: FC<IListItems> = ({ allMoviesList }: IListItems) => {
  const { navigate } = useNavigation<Nav>();
  const { colors } = useTheme();

  const movies = allMoviesList.map((movie) => {
    return movie.genres.map((genre) => {
      return genre.name
    });
  });

  const [selectedValue, setselectedValue] = useState('all');
  const filteredData = allMoviesList.filter((movie) => movie.genres.map((genre) => {return genre.name}).includes(selectedValue));

  return (
    <>
      <TextTypography.Subtitle style={{ marginTop: margin.sm }}>
        Movies
      </TextTypography.Subtitle>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setselectedValue(itemValue)}
        style={{ height: 88 }}
        itemStyle={{ height: 88, color: colors.text }}
      >
        <Picker.Item label="All movies" value="all"/>
        {getGenreArray(movies).map((genre) => {
            return <Picker.Item key={genre} label={genre} value={genre} />
        })}
      </Picker>

      <FlatList
        data={(selectedValue === "all" ? allMoviesList : filteredData)}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
        style={{ marginBottom: 100 }}
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
                  {item.genres.map((genre) => {
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
