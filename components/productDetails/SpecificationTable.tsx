import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Product } from "@/models/Product";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MontserratFont } from "@/constants/Fonts";
interface SpecificationTableProps {
    product: Product;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ product }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {product.ProductSpecifications.map((spec, index) => (
                <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>
                            {spec.Specification_Key}
                        </Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.cell}>
                        <Text style={styles.value}>
                            {spec.Specification_Value}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: wp("4%"),
        backgroundColor: "#f5f5f5",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: hp("1%"),
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cell: {
        flex: 1,
        paddingHorizontal: wp("2%"),
    },
    label: {
        fontSize: wp("3.5%"),
        color: "#333",
        fontFamily: MontserratFont,
    },
    value: {
        fontSize: wp("3.5%"),
        color: "#333",
        fontFamily: MontserratFont,
    },
    line: {
        width: wp("0.5%"),
        height: "100%",
        backgroundColor: "#ddd",
    },
});

export default SpecificationTable;
