import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import CarouselComponent from "@/components/home/Carousel"; // Adjust the import path as needed
import HotDeals from "@/components/home/HotDeals";
import MainStores from "@/components/home/MainStores";
import InputSearch from "@/components/home/InputSearch";
import MainCategories from "@/components/home/MainCategories";
import TrendyProducts from "@/components/home/TrendyProducts";
import { StoreProvider } from "@/hooks/context/StoreContext";
export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.canves}>
            <View style={styles.searchContainer}>
                <InputSearch setSearchQuery={() => {}} />
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CarouselComponent />
                    <HotDeals />
                    <MainCategories />
                    <StoreProvider>
                        <MainStores />
                    </StoreProvider>
                    <TrendyProducts />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        zIndex: 2, // Ensure it is above the ScrollView
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    canves: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
