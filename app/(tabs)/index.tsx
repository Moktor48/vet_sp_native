import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import type { TestData } from "@/components/types/extraTypes";
import ApiCall from "@/components/api/ApiCall";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";

export default function HomeScreen() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

const Main = () => {
  const { user, login } = useAuth();
  // Don't lose this block!
  const [data, setData] = useState<TestData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  ApiCall<TestData>({ api: "GET", key: "testdata", setData, setLoading });
  let rendered: string[] = [];
  if (loading) {
    rendered.push("Loading...");
  } else if (data.length === 0) {
    rendered.push("No data found");
  } else {
    data.map((dat) => rendered.push(dat.name));
  }
  //^^ This block is necessary for API calls
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      {user ? (
        <ThemedView>
          {rendered.map((item, index) => (
            <Text style={styles.textWhite} key={index}>
              {item}
            </Text>
          ))}
        </ThemedView>
      ) : (
        <View>
          <Text style={styles.textWhite}>You are not logged in</Text>
          <Button title="Login" onPress={login} />
        </View>
      )}
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
