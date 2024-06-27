import {
    Text,
    ImageBackground,
    View,
    StyleSheet,
    Pressable,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgUri } from "react-native-svg";
import { MontserratFont } from "@/constants/Fonts";
import {
    BASE_URL_IMAGE,
    CATEGORIES_SHAPE_ORANGA_IMAGE,
    CATEGORIES_SHAPE_TEAL_IMAGE,
} from "@/constants/Api";
import { useFilter } from "@/hooks/context/FilterContext";

type CategoryCardProps = {
    imageSrc: any;
    title: string;
    id: number;
    index: number;
};

type RootStackParamList = {
    ProductList: undefined;
    products: {};
};

const CategoryCard: React.FC<CategoryCardProps> = ({
    imageSrc,
    title,
    id,
    index,
}) => {
    const { state, dispatch } = useFilter();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => {
        setCategoryQuery([id]);
        navigation.navigate("products", {});
    };

    const setCategoryQuery = (query: number[]) => {
        dispatch({ type: "SET_CATEGORIES", payload: query });
        dispatch({ type: "SET_SELECTED_CATEGORIES", payload: query });
    };
    const isOdd = (index + 1) % 2 === 1;
    const oddStyleImage = isOdd ? styles.icon1 : styles.icon2;
    const oddStyleText = isOdd ? styles.title1 : styles.title2;
    const shapeUri = isOdd
        ? CATEGORIES_SHAPE_ORANGA_IMAGE
        : CATEGORIES_SHAPE_TEAL_IMAGE;

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.card}>
                <ImageBackground style={styles.imageBackground}>
                    <SvgUri
                        width={wp("48%")}
                        height={hp("12.6%")}
                        uri={BASE_URL_IMAGE + shapeUri}
                    />
                </ImageBackground>
                <View>
                    <SvgUri
                        height={hp("5.5%")}
                        width={wp("20.5%")}
                        style={oddStyleImage}
                        uri={BASE_URL_IMAGE + imageSrc}
                    />
                    <Text style={oddStyleText}>{title}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp("46%"),
        height: hp("11%"),
        backgroundColor: "#fff",
        borderRadius: wp("2.5%"),
        elevation: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        position: "absolute",
        width: wp("48%"),
        height: hp("12%"),
        resizeMode: "cover",
    },
    title1: {
        fontSize: wp("3.5%"),
        fontFamily: MontserratFont,
        color: "#fff",
        marginLeft: wp("1.5%"),
    },

    title2: {
        fontSize: wp("3.5%"),
        fontFamily: MontserratFont,
        color: "#fff",
        marginLeft: wp("15.5%"),
    },

    icon1: {
        marginLeft: wp("20.5%"),
    },
    icon2: {
        marginRight: wp("20.5%"),
    },
});

export default CategoryCard;
