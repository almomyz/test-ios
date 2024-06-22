import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Colors } from "@/constants/Colors";
import loadingAnimation from "@/assets/animations/AnimationCard.json"; // Make sure you have a Lottie JSON file at this path

const LoadingCard = () => (
    <LottieView source={loadingAnimation} autoPlay loop style={styles.lottie} />
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: "45%", // Adjust to fit two columns
        alignItems: "center", // Center align the Lottie animation
        justifyContent: "center",
    },
    lottie: {
        height: 200,
        width: 185,
        margin:10
    },
});

export default LoadingCard;
