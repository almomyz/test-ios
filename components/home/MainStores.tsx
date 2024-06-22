import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    ActivityIndicator,
    Pressable,
} from "react-native";
import StoreCard from "@/components/home/StoreCard";
import { MontserratFont } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { useStores } from "@/hooks/stores/useStores"; // Import the custom hook
import { Store } from "@/models/Store";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ListHeader = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Main Stores</Text>
    </View>
);

const MainStores = () => {
    const { data: stores, isLoading, error } = useStores(); // Use the custom hook

    const renderStoreItem = ({ item }: { item: Store }) => (
        <StoreCard key={item.id} name={item.Name} imageUrl={item.Logo} id={item.id} />
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ListHeader />
            <FlatList
                horizontal={true}
                data={stores}
                style={styles.list}
                renderItem={renderStoreItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
        marginLeft: wp("3%"),
        flexDirection: "row",
    },
    headerText: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: Colors.secondaryColor,
        fontFamily: MontserratFont,
    },
    list: {
        marginBottom: hp("2.5%"),
    },
    errorText: {
        color: "red",
        fontSize: wp("4%"),
        textAlign: "center",
        marginTop: hp("2.5%"),
    },
});

export default MainStores;
