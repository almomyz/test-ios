import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFilter } from "@/hooks/context/FilterContext";
interface StoreCardProps {
    name: string;
    imageUrl: string;
    id:number
}
type RootStackParamList = {
    ProductList: undefined;
    products: {};
};

const StoreCard: React.FC<StoreCardProps> = ({ name, imageUrl,id }) => {
    const { state, dispatch } = useFilter();

    const setStoreQuery = (query: number[]) => {
        dispatch({ type: "SET_STORES", payload: query });
        dispatch({ type: "SET_SELECTED_STORES", payload: query });
    };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => {
        setStoreQuery([id]);
        navigation.navigate("products", {});
    };
    return (
        <Pressable onPress={handlePress}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: imageUrl,
                        }}
                    />
                </View>
                <Text style={styles.text}>{name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        borderRadius: wp("5%"),
        height: hp("13%"),
        width: wp("45%"),
        padding: wp("2.5%"),
        margin: wp("5%"),
        position: "relative",
        backgroundColor: "#fff",
        shadowOpacity: 0.25,
        elevation: 5,
    },
    logo: {
        height: hp("10%"),
        width: wp("40%"),
        resizeMode: "contain",
    },
    text: {
        alignContent: "center",
        alignItems: "center",
        fontFamily: MontserratFont,
        fontSize: wp("4%"),
        fontWeight: "400",
    },
});

export default StoreCard;
