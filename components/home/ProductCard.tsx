import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SvgComponent from "@/assets/images/lablediscount";
import { Product } from "@/models/Product";
import { Colors } from "@/constants/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ProductCardProps {
    product: Product;
}

type RootStackParamList = {
    ProductList: undefined;
    productDetails: { product: Product };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate("productDetails", { product });
    };

    if (!product) {
        return null;
    }

    const { Name, ProductPrices, ProductPhotos } = product;

    const discount = ProductPrices?.[0]?.Discount || 0;
    const originalPrice = ProductPrices?.[0]?.WasPrice || 0;
    const discountedPrice = ProductPrices?.[0]?.Price || 0;
    const imageUrl = ProductPhotos?.[0]?.Photo_URL || "";
    const logo = ProductPrices?.[0]?.Store?.Logo || "";
    const currency = ProductPrices?.[0]?.Currency.Name || "";

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {discount > 0 && (
                <View style={styles.discountTagContainer}>
                    <SvgComponent />
                    <Text style={styles.discountTagText}>
                        {Math.floor(discount)}%
                    </Text>
                </View>
            )}

            <View style={styles.cardContainer}>
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text
                        style={styles.productName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {Name}
                    </Text>
                    <View style={styles.priceContainer}>
                        <Image
                            style={styles.logo}
                            source={{
                                uri: logo,
                            }}
                        />
                        <Text style={styles.discountedPrice}>
                            {discountedPrice} {currency}
                        </Text>
                        {discount > 0 && (
                            <Text style={styles.originalPrice}>
                                {originalPrice} {currency}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    cardContainer: {
        borderRadius: wp("2%"),
        overflow: "hidden",
        width: wp("45%"),
        padding: wp("2%"),
        margin: wp("2%"),
        position: "relative",
        backgroundColor: "#fff",
        shadowOpacity: 0.25,
        elevation: 5,
        height: hp("24%"),
    },
    discountTagContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        height: hp("5%"),
        width: wp("15%"),
        zIndex: 1,
    },
    discountTagText: {
        color: "white",
        fontWeight: "bold",
        zIndex: 1,
        position: "absolute",
        transform: [{ rotate: "-50deg" }],
        textAlign: "right",
        paddingRight: wp("6%"),
        paddingBottom: wp("4%"),
        fontSize: wp("3%"),
    },
    productImage: {
        width: "100%",
        height: hp("11%"),
        resizeMode: "contain",
    },
    productInfo: {
        marginTop: hp("1%"),
    },
    productName: {
        fontSize: wp("4%"),
        fontWeight: "bold",
        color: Colors.bodyColor,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    discountedPrice: {
        fontSize: wp("3.2%"),
        fontWeight: "bold",
        color: Colors.bodyColor,
    },
    originalPrice: {
        fontSize: wp("2.8%"),
        color: "#999",
        textDecorationLine: "line-through",
        marginLeft: wp("2%"),
        marginRight: wp("5%"),
        marginBottom: hp("1%"),
    },
    logo: {
        height: hp("5%"),
        width: hp("5%"),
        resizeMode: "contain",
        marginRight: wp("1%"),
    },
    officialStoreTag: {
        backgroundColor: "#eee",
        color: "#333",
        paddingVertical: hp("0.5%"),
        paddingHorizontal: wp("2.5%"),
        borderRadius: wp("2%"),
        fontSize: wp("3%"),
        textAlign: "center",
        marginTop: hp("1%"),
        alignSelf: "flex-start",
    },
});

export default ProductCard;
