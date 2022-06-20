import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Authentication</Text>
      <Text>Login or register into your favorite movie app build for azot.dev technical test</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
        />
      </SafeAreaView>
      <Button
        title="Authenticate"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button
        style={styles.link}
        title="Don't have an account yet ? Register here."
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  link: {
    
  }
});

export default HomeScreen;
