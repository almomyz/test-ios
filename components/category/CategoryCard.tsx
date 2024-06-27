import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
    Categories,
    SubcategoryLevel1,
    SubcategoryLevel2,
} from "@/models/Categories";
import { SvgUri } from "react-native-svg";
import { BASE_URL_IMAGE } from "@/constants/Api";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFilter } from "@/hooks/context/FilterContext";
interface Props {
    data: Categories[];
}

type RootStackParamList = {
    ProductList: undefined;
    products: {};
};

const CategoryCard: React.FC<Props> = ({ data }) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { state, dispatch } = useFilter();
    const handleTextClick = (id: number) => {
        console.log("Category ID:", id);
        setCategoryQuery([id]);
        navigation.navigate("products", {});
    };

    const setCategoryQuery = (query: number[]) => {
        dispatch({ type: "SET_CATEGORIES", payload: query });
        dispatch({ type: "SET_SELECTED_CATEGORIES", payload: query });
    };
    const renderHeader = (
        section: SubcategoryLevel1,
        index: number,
        isActive: boolean
    ) => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleTextClick(section.id)}>
                    <Text style={styles.headerText}>{section.Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleSection(index)}>
                    <Icon
                        name={isActive ? "expand-less" : "expand-more"}
                        size={wp("8%")} // Responsive icon size
                        color={Colors.primaryColor}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderContent = (section: SubcategoryLevel1) => {
        return (
            <View style={styles.content}>
                <View style={styles.contentRow}>
                    {section.SubcategoriesLevel2?.map(
                        (item: SubcategoryLevel2) => (
                            <View key={item.id} style={styles.contentItem}>
                                <TouchableOpacity
                                    onPress={() => handleTextClick(item.id)}
                                >
                                    <Text style={styles.contentText}>
                                        {item.Name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    )}
                </View>
            </View>
        );
    };

    const updateSections = (activeSections: number[]) => {
        setActiveSections(activeSections);
    };

    const toggleSection = (index: number) => {
        let newActiveSections = [...activeSections];
        if (newActiveSections.includes(index)) {
            newActiveSections = newActiveSections.filter((i) => i !== index);
        } else {
            newActiveSections.push(index);
        }
        setActiveSections(newActiveSections);
    };

    const ListHeader = ({ category }: { category: Categories }) => (
        <View style={styles.headerContainer}>
            <SvgUri style={styles.icon} uri={BASE_URL_IMAGE + category.Image} />
            <TouchableOpacity onPress={() => handleTextClick(category.id)}>
                <Text style={styles.headerText2}>{category.Name}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {data.map((category, index) => (
                <View key={category.id}>
                    <ListHeader category={category} />
                    <Accordion
                        sections={category.SubcategoriesLevel1 ?? []}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}
                        underlayColor="transparent"
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp("90%"), // Responsive width
        padding: wp("5%"), // Responsive padding
        borderRadius: wp("5%"), // Responsive borderRadius
        marginHorizontal: wp("5%"), // Responsive margin
        marginVertical: wp("5%"), // Responsive margin
        elevation: 5,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp("1.5%"), // Responsive padding
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    headerText: {
        fontSize: wp("4%"), // Responsive font size
        fontWeight: "500",
        fontFamily: MontserratFont,
    },
    content: {
        paddingVertical: hp("1%"), // Responsive padding
    },
    contentRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    contentItem: {
        width: "50%", // Two items per row
        paddingVertical: hp("1%"), // Responsive padding
    },
    contentText: {
        fontSize: wp("3.5%"), // Responsive font size
        fontFamily: MontserratFont,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: hp("2%"), // Responsive margin
    },
    headerText2: {
        fontSize: wp("5%"), // Responsive font size
        fontWeight: "bold",
        color: Colors.secondaryColor,
        fontFamily: MontserratFont,
    },
    icon: {
        marginRight: wp("3%"), // Responsive margin
    },
});

export default CategoryCard;
