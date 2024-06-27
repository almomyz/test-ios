import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import CategoryCard from "@/components/category/CategoryCard";
import InputSearch from "@/components/home/InputSearch";
import { useCategories } from "@/hooks/stores/useCategories";
import {
    Categories,
    SubcategoryLevel1,
    SubcategoryLevel2,
} from "@/models/Categories";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFilter } from "@/hooks/context/FilterContext";

type CategoryMap = {
    [key: string]: number;
};

function getCategoryNames(categories: Categories[]): {
    names: string[];
    map: CategoryMap;
} {
    const names: string[] = [];
    const map: CategoryMap = {};

    function traverse(
        category: Categories | SubcategoryLevel1 | SubcategoryLevel2
    ) {
        names.push(category.Name);
        map[category.Name] = category.id;

        if ("SubcategoriesLevel1" in category && category.SubcategoriesLevel1) {
            category.SubcategoriesLevel1.forEach(
                (subCategory: SubcategoryLevel1) => traverse(subCategory)
            );
        }

        if ("SubcategoriesLevel2" in category && category.SubcategoriesLevel2) {
            category.SubcategoriesLevel2.forEach(
                (subSubCategory: SubcategoryLevel2) => traverse(subSubCategory)
            );
        }
    }

    categories.forEach((category) => traverse(category));

    return { names, map };
}

export default function TabTwoScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { data: categories, isLoading, error } = useCategories();
    const { state, dispatch } = useFilter();

    type RootStackParamList = {
        ProductList: undefined;
        products: {};
    };

    const setCategoryQuery = (item: string) => {
        console.log("Selected Item:", item);
        const { map } = getCategoryNames(categories || []);
        const categoryId = map[item];
        console.log("Selected Item ID:", categoryId);
        dispatch({ type: "SET_CATEGORIES", payload: [categoryId] });
        dispatch({ type: "SET_SELECTED_CATEGORIES", payload: [categoryId] });
        navigation.navigate("products", {});
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    const { names: categoryNames } = getCategoryNames(categories || []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <InputSearch
                        setSearchQuery={() => {}}
                        data={categoryNames}
                        handleItemSelect={setCategoryQuery}
                        hideList={false}
                    />
                </View>
                {categories && <CategoryCard data={categories} />}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        zIndex: 1, // Ensure it is above the ScrollView
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});
