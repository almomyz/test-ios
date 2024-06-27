import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import CarouselComponent from "@/components/home/Carousel"; // Adjust the import path as needed
import HotDeals from "@/components/home/HotDeals";
import MainStores from "@/components/home/MainStores";
import InputSearch from "@/components/home/InputSearch";
import MainCategories from "@/components/home/MainCategories";
import TrendyProducts from "@/components/home/TrendyProducts";
import { StoreProvider } from "@/hooks/context/StoreContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFilter } from "@/hooks/context/FilterContext";

const HomeScreen = () => {
    const { state, dispatch } = useFilter();
    const [hideList, setHideList] = useState(false);
    type RootStackParamList = {
        ProductList: undefined;
        products: {};
    };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const data = [
        "iphone",
        "samsung",
        "xiaomi",
        "oneplus",
        "redmi",
        "nokia",
        "sony",
        "huawei",
        "iphone",
        "samsung",
        "xiaomi",
        "oneplus",
        "redmi",
        "nokia",
        "sony",
        "huawei",
        "iphone 15",
        "samsung s20",
        "samsung s10",
        "samsung s11",
        "samsung s12",
        "samsung s13",
        "samsung s14",
        "sony xperia",
        "huawei p30",
        "redmi note 11",
        "nokia 3310",
        "oneplus 9",
    ];

    const handleItemSelect = (item: string) => {
        console.log("Selected Item:", item);
        dispatch({ type: "SET_SEARCH", payload: item });
        navigation.navigate("products", {});
        // Handle the selected item
    };

    const setSearchQuery = (query: string) => {
        console.log("Search Query:", query);
        // Handle search query update
    };

    return (
        <SafeAreaView style={styles.canves}>
            <View style={styles.searchContainer}>
                <InputSearch
                    setSearchQuery={setSearchQuery}
                    data={data}
                    handleItemSelect={handleItemSelect}
                    hideList={hideList}
                />
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
};

const styles = StyleSheet.create({
    searchContainer: {
        zIndex: 1, // Ensure it is above the ScrollView
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

export default HomeScreen;
