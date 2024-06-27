import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import CategoryCard from "./CategoryCard";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useCategories } from "@/hooks/stores/useCategories";
import { Categories, SubcategoryLevel2 } from "@/models/Categories";

const ListHeader = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Main Categories</Text>
    </View>
);

const MainCategories: React.FC = () => {
    const { data: allCategories, isLoading, error } = useCategories(); // Use the custom hook

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    // Filter and map the categories to match the required structure
    const categories = allCategories?.reduce<SubcategoryLevel2[]>(
        (acc, allCategories) => {
            allCategories.SubcategoriesLevel1?.forEach((subcategory1) => {
                subcategory1.SubcategoriesLevel2?.forEach((subcategory2) => {
                    if (subcategory2.Image) {
                        acc.push(subcategory2);
                    }
                });
            });
            return acc;
        },
        []
    );

    const renderItem: ListRenderItem<SubcategoryLevel2> = ({ item, index }) => (
        <View style={styles.cardContainer}>
            <CategoryCard
                imageSrc={item.Image} // Adjust this path accordingly
                title={item.Name}
                id={item.id}
                index={index} // Send the index instead of id
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={<ListHeader />}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp("1%"),
        paddingTop: hp("2%"),
    },
    contentContainer: {
        paddingBottom: hp("2%"),
    },
    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: hp("2%"), // Add margin between rows
    },
    cardContainer: {
        width: wp("45%"),
        marginHorizontal: wp("2%"), // Add margin between columns
    },
    headerContainer: {
        width: "100%",
        paddingBottom: hp("2%"),
        marginLeft: hp("1%"),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: Colors.secondaryColor,
        fontFamily: MontserratFont,
    },
});

export default MainCategories;
