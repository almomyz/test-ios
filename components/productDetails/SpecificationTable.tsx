import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Product } from "@/models/Product";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SpecificationTableProps {
    product: Product;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ product }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {product.ProductSpecifications.map((spec, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{spec.Specification_Key}</Text>
                    <View style={styles.line} />
                    <Text style={styles.value}>{spec.Specification_Value}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: wp('4%'),
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: wp('5%'),
        fontWeight: "bold",
        marginBottom: hp('2%'),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    label: {
        fontSize: wp('4%'),
        color: "#989696",
    },
    value: {
        fontSize: wp('4%'),
        color: "#989696",
    },
    line: {
        width: wp('0.5%'),
        height: "100%",
        backgroundColor: "#ddd",
    },
});

export default SpecificationTable;
