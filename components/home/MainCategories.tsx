import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import CategoryCard from "./CategoryCard";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ListHeader = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Main Categories</Text>
    </View>
);

const MainCategories: React.FC = () => {
    const categories = [
        {
            title: "Smartphones",
            imageSrc: require("@/assets/images/smartphones.png"),
        },
        { title: "Laptops", imageSrc: require("@/assets/images/laptops.png") },
        {
            title: "Cameras",
            imageSrc: require("@/assets/images/cameras.png"),
        },
        {
            title: "Headphones",
            imageSrc: require("@/assets/images/headphones.png"),
        },
        {
            title: "Smartwatches",
            imageSrc: require("@/assets/images/smartwatches.png"),
        },
        { title: "Tablets", imageSrc: require("@/assets/images/tablets.png") },
    ];

    const renderItem: ListRenderItem<(typeof categories)[0]> = ({ item }) => (
        <View style={styles.cardContainer}>
            <CategoryCard imageSrc={item.imageSrc} title={item.title} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
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
