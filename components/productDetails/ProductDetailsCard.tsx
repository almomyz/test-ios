import React from "react";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, Image } from "react-native";
import { MontserratFont } from "@/constants/Fonts";
import TabViews from "./TabViews";
import { Product } from "@/models/Product";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BASE_URL_IMAGE } from "@/constants/Api";
import { SvgUri } from "react-native-svg";

interface ProductDetailsCardProps {
    product: Product;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
    // Clean up the description string to remove unwanted characters: double quotes, backslashes, asterisks, and square brackets
    let cleanedDescription = product.Description.replace(/[["\\*\[\]]/g, "");

    // Split the cleaned string into an array of strings
    const descriptionList = cleanedDescription
        .split(",")
        .map((item) => item.trim());

    return (
        <View style={styles.container}>
            <View style={styles.shap}></View>
            <Text style={styles.name}>{product.Name}</Text>

            <View style={styles.bulletPointsContainer}>
                {descriptionList.map((item, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                        - {item}
                    </Text>
                ))}
            </View>
            <View style={styles.containerPrice}>
                <SvgUri
                    height={hp("4%")}
                    width={wp("20%")}
                    uri={BASE_URL_IMAGE + product.ProductPrices[0].Store.Logo}
                />
                <Text style={styles.price}>
                    {product.ProductPrices[0].Price}{" "}
                    {product.ProductPrices[0].Currency.Name}
                </Text>
            </View>
            <TabViews product={product} />
        </View>
    );
};

// Update styles to include styling for bullet points
const styles = StyleSheet.create({
    container: {
        flex: 2,
        borderRadius: wp("6%"),
        borderWidth: 1,
        borderColor: "#E1E1E1",
        backgroundColor: "#fff",
        elevation: 10,
        alignContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: wp("7.5%"),
        paddingVertical: hp("2.5%"),
    },
    shap: {
        height: hp("0.5%"),
        width: wp("20%"),
        backgroundColor: "#E1E1E1",
        borderRadius: wp("2.5%"),
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    name: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: Colors.bodyColor,
        marginVertical: hp("2.5%"),
        fontFamily: MontserratFont,
    },
    logo: {
        height: hp("3.75%"),
        width: wp("12.5%"),
        resizeMode: "contain",
        marginRight: wp("5%"),
    },
    bulletPointsContainer: {
        marginTop: hp("2.5%"),
    },
    bulletPoint: {
        color: "#989696",
        fontSize: wp("4%"),
        marginBottom: hp("1.25%"),
        fontFamily: MontserratFont,
    },
    containerPrice: {
        flexDirection: "row",
        alignItems: "flex-start",
        alignContent: "flex-start",
        alignSelf: "flex-start",
        margin: wp("2.5%"),
    },
    price: {
        color: Colors.bodyColor,
        fontSize: wp("5%"),
        fontFamily: MontserratFont,
        fontWeight: "bold",
        marginLeft:wp("3")
    },
});

export default ProductDetailsCard;
