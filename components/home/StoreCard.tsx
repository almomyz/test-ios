import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ImageBackground,
} from "react-native";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFilter } from "@/hooks/context/FilterContext";
import { SvgUri } from "react-native-svg";
import { BASE_URL_IMAGE } from "@/constants/Api";
interface StoreCardProps {
    name: string;
    imageUrl: string;
    id: number;
}
type RootStackParamList = {
    ProductList: undefined;
    products: {};
};

const StoreCard: React.FC<StoreCardProps> = ({ name, imageUrl, id }) => {
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
                    <ImageBackground
                        style={styles.imageBackground}
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/mlproject-60be1.appspot.com/o/Rectangle%2012%20(3).svg?alt=media&token=4deba809-f44e-4e09-954b-92d268a0871a",
                        }}
                    >
                        <SvgUri
                            height={hp("10%")}
                            width={wp("40%")}
                            uri={BASE_URL_IMAGE + imageUrl}
                        />
                    </ImageBackground>
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
    imageBackground: {
        position: "absolute",
        width: wp("45%"),
        height: hp("10%"),
        margin: wp("2.5%"),
        resizeMode: "cover",
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
