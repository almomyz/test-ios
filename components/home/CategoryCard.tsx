import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type CategoryCardProps = {
    imageSrc: any;
    title: string;
};

type RootStackParamList = {
    ProductList: undefined;
    products: {};
            
};

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, title }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => {
        navigation.navigate("products", {});
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={styles.card}>
                <Image source={imageSrc} style={styles.image} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp("46%"),
        height: hp("12%"),
        backgroundColor: "#fff",
        marginVertical: wp("1.25%"),
        borderRadius: wp("2.5%"),
        elevation: 10,
    },
    image: {
        width: wp("46%"),
        height: hp("12%"),
        resizeMode: "stretch",
    },
    title: {
        fontSize: wp("4%"),
        fontWeight: "bold",
    },
});

export default CategoryCard;
