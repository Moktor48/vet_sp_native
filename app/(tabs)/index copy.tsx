import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import type { TestData } from "@/components/types/extraTypes";
export default function HomeScreen() {
  const [data, setData] = useState<TestData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("https://learn2veteran.moktor.com/api/GET/testdata")
      .then((res) => res.json())
      .then((data: TestData) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  let rendered: string[] = [];
  if (loading) {
    rendered.push("Loading...");
  } else if (data.length === 0) {
    rendered.push("No data found");
  } else {
    data.map((dat) => rendered.push(dat.name));
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView>
        {rendered.map((item, index) => (
          <Text style={styles.textWhite} key={index}>
            {item}
          </Text>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

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
