import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Pressable,
    Linking,
} from "react-native";
import { MontserratFont } from "@/constants/Fonts";
import { Product } from "@/models/Product";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgUri } from "react-native-svg";
import { BASE_URL_IMAGE } from "@/constants/Api";
interface PriceComparisonCardProps {
    product: Product;
}

const PriceComparisonItem: React.FC<{
    price: number;
    storeName: string;
    logoUri: string;
    currency: string;
    url: string;
}> = ({ price, storeName, logoUri, currency, url }) => {
    const handlePress = () => {
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.itemContainer}>
            <SvgUri
            height={hp("5%")}
            width={wp("20%")}
            uri={BASE_URL_IMAGE + logoUri}
        />
                <View style={styles.textContainer}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.price}>
                        {price} {currency}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({
    product,
}) => {
    // Assuming product.ProductPrices is an array of objects that contain Store and Price details
    const renderItem = ({ item }: { item: any }) => {
        return (
            <PriceComparisonItem
                url={product.Url}
                currency={item.Currency.Name}
                price={item.Price}
                storeName={item.Store.Name}
                logoUri={item.Store.Logo}
            />
        );
    };

    return (
        <FlatList
            data={product.ProductPrices}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
            contentContainerStyle={styles.listContainer}
            style={styles.containerList}
        />
    );
};

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
        marginVertical: hp("1%"),
        padding: wp("3%"),
    },
    logo: {
        height: hp("5%"),
        width: wp("15%"),
        resizeMode: "contain",
    },
    textContainer: {
        marginLeft: wp("3%"),
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    storeName: {
        fontSize: wp("4%"),
        fontFamily: MontserratFont,
    },
    price: {
        fontSize: wp("3.5%"),
        fontFamily: MontserratFont,
        color: "#888",
    },
    listContainer: {
        paddingHorizontal: wp("3%"),
    },
});

export default PriceComparisonCard;
