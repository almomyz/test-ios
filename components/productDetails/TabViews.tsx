import React from "react";
import { View, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PriceComparisonCard from "./PriceComparisonCard";
import SpecificationTable from "./SpecificationTable";
import { MontserratFont } from "@/constants/Fonts";
import { Product } from "@/models/Product";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ProductDetailsCardProps {
    product: Product;
}

const FirstRoute = ({ product }: { product: Product }) => (
    <View style={styles.tabs}>
        <PriceComparisonCard product={product} />
    </View>
);

const SecondRoute = ({ product }: { product: Product }) => (
    <View style={styles.tabs}>
        <SpecificationTable product={product} />
    </View>
);

const renderScene = (product: Product) =>
    SceneMap({
        first: () => <FirstRoute product={product} />,
        second: () => <SecondRoute product={product} />,
    });

const TabViews: React.FC<ProductDetailsCardProps> = ({ product }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "first", title: "Price Comparison" },
        { key: "second", title: "Specification" },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
            activeColor="#588B8B"
            inactiveColor="#888"
        />
    );

    return (
        <View style={styles.container}>
            <TabView
                style={styles.tabView}
                navigationState={{ index, routes }}
                renderScene={renderScene(product)}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tabs: {
        backgroundColor: "#fff",
    },
    tabView: {
        marginVertical: hp("2%"), // 2% of height of the screen
        borderRadius: 10,
        marginRight: wp("15%"), // 10% of width of the screen
        flex: 1,
    },
    container: {
        width: wp("100%"),
        flex: 1,
    },
    tabBar: {
        backgroundColor: "#fff",
        elevation: 5,
        borderColor: "#E1E1E1",
        borderWidth: 1,
        flex: 1,
    },
    indicator: {
        backgroundColor: "#588B8B",
    },
    label: {
        fontWeight: "bold",
        fontSize: wp("3.5%"), // 4% of width of the screen
        fontFamily: MontserratFont,
    },
});

export default TabViews;
