import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import CarouselComponent from "@/components/productDetails/Carousel";
import ProductDetailsCard from "@/components/productDetails/ProductDetailsCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Product } from "@/models/Product";
import { useProductDetails } from "@/hooks/stores/useProductDetails";

type RootStackParamList = {
    productDetails: { product: Product };
};

const ProductDetails: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, "productDetails">>();
    const navigation = useNavigation();
    const { product } = route.params;
    const { data, error, isLoading } = useProductDetails(product.id);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    Failed to load product details.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Icon
                    style={styles.icon}
                    name="arrow-back"
                    size={30}
                    color={Colors.secondaryColor}
                    onPress={() => navigation.goBack()}
                />
                {data ? (
                    <>
                        <CarouselComponent
                            productPhotos={data.ProductPhotos}
                            available={data.Available}
                        />
                        <ProductDetailsCard product={data} />
                    </>
                ) : (
                    <Text style={styles.noPhotosText}>
                        No product photos available.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    icon: {
        marginHorizontal: 20,
        marginTop: 40,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    noPhotosText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 16,
    },
});

export default ProductDetails;
