// src/screens/settings.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CarouselComponent from "@/components/home/Carousel"; // Adjust the import path as needed
import { HelloWave } from "@/components/HelloWave";

("@/components/HelloWave");
const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wellcome to Profile</Text>
      <HelloWave />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});


export default SettingsScreen;
