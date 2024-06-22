import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Section {
    title: string;
    content: string[];
}

const SECTIONS: Section[] = [
    {
        title: "Mobile Phones, Tablets & Accessories",
        content: [
            "Smartphones",
            "Tablets",
            "Cases & Covers",
            "Chargers",
            "Screen Protectors",
        ],
    },
    {
        title: "Computers & Laptops",
        content: [
            "Laptops",
            "Desktops",
            "Monitors",
            "Keyboards & Mice",
            "Accessories",
        ],
    },
    {
        title: "Audio & Headphones",
        content: ["Headphones", "Earbuds", "Speakers", "Home Audio Systems"],
    },
    {
        title: "Cameras & Photography",
        content: ["Digital Cameras", "Lenses", "Tripods", "Memory Cards"],
    },
    {
        title: "Wearable Technology",
        content: [],
    },
];

const CategoryCard: React.FC = () => {
    const [activeSections, setActiveSections] = useState<number[]>([]);

    const renderHeader = (section: Section, _: number, isActive: boolean) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
                <Icon
                    name={isActive ? "expand-less" : "expand-more"}
                    size={wp("8%")} // Responsive icon size
                    color={Colors.primaryColor}
                    style={styles.icon}
                />
            </View>
        );
    };

    const renderContent = (section: Section) => {
        return (
            <View style={styles.content}>
                <View style={styles.contentRow}>
                    {section.content.map((item: string, index: number) => (
                        <View key={index} style={styles.contentItem}>
                            <Text style={styles.contentText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const updateSections = (activeSections: number[]) => {
        setActiveSections(activeSections);
    };

    const ListHeader = () => (
        <View style={styles.headerContainer}>
            <Icon
                name="devices"
                size={wp("8%")} // Responsive icon size
                color={Colors.primaryColor}
                style={styles.icon}
            />
            <Text style={styles.headerText2}>Electronics</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ListHeader />
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                underlayColor="transparent"
            />
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
