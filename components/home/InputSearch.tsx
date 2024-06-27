import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Autocomplete from "react-native-autocomplete-input";
import { Colors } from "@/constants/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MontserratFont } from "@/constants/Fonts";

interface InputSearchProps {
    setSearchQuery: (query: string) => void;
    data: string[];
    handleItemSelect: (item: string) => void;
    hideList: boolean;
}

const InputSearch: React.FC<InputSearchProps> = ({
    setSearchQuery,
    data,
    handleItemSelect,
    hideList,
}) => {
    const [query, setQuery] = useState<string>("");
    const [filteredData, setFilteredData] = useState<string[]>(data);

    const handleInputChange = (text: string) => {
        setQuery(text);
        setSearchQuery(text);

        // Filter data based on the input text
        const newData = data.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(newData);
    };

    const clearInput = () => {
        setQuery("");
        setSearchQuery("");
        setFilteredData(data);
    };

    const onItemSelect = (item: string) => {
        setQuery(item);
        setSearchQuery(item);
        handleItemSelect(item);
    };

    return (
        <View style={styles.inputContainerStyle}>
            <Autocomplete
                data={query ? filteredData : []}
                defaultValue={query}
                onChangeText={handleInputChange}
                hideResults={hideList}
                placeholder="Search by product name or URL"
                listContainerStyle={styles.listContainerStyle}
                placeholderTextColor="#989696"
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.autocompleteInputContainer}
                renderTextInput={(props) => (
                    <View style={styles.inputWrapper}>
                        <Icon
                            name="search"
                            size={wp("7%")} // Responsive icon size
                            color={Colors.primaryColor}
                            style={styles.icon}
                        />
                        <TextInput
                            {...props}
                            style={[props.style, styles.input]}
                        />
                        {query.length > 0 && (
                            <TouchableOpacity onPress={clearInput}>
                                <Icon
                                    name="clear"
                                    size={wp("6%")}
                                    color={Colors.primaryColor}
                                    style={styles.clearIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                flatListProps={{
                    keyExtractor: (_, idx) => idx.toString(),
                    renderItem: ({ item, index }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => onItemSelect(item)}
                                style={styles.itemContainer}
                            >
                                <Icon
                                    name="label-outline"
                                    size={wp("6%")}
                                    color={Colors.primaryColor}
                                    style={styles.itemIcon}
                                />
                                <Text style={styles.item}>{item}</Text>
                            </TouchableOpacity>
                            {index < filteredData.length - 1 && (
                                <View style={styles.separator} />
                            )}
                        </View>
                    ),
                    contentContainerStyle: styles.autocompleteList, // Customize the style of the list here
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainerStyle: {
        height: hp("5%"),
        width: wp("100%"),
        alignItems: "center",
        marginTop: hp("6%"),
        marginBottom: hp("2.5%"),
        elevation: 3, // Add shadow/elevation for depth
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    icon: {
        marginLeft: wp("2%"),
    },

    input: {
        flex: 1,
        color: Colors.bodyColor,
        paddingLeft: wp("3%"),
        paddingRight: wp("3%"),

        borderRadius: 25,
        height: hp("4.5%"),
        marginVertical: hp("3.5%"),
    },

    clearIcon: {
        marginRight: wp("2%"),
    },

    listContainerStyle: {
        flex: 1,
        marginTop: hp("5%"),
        position: "absolute",
        width: wp("97%"),
        zIndex: 1,
        height: "auto",
    },

    autocompleteContainer: {
        flex: 1,
    },

    autocompleteInputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        height: hp("5%"),
        width: wp("97%"),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 25,
        paddingLeft: wp("3%"),
        paddingRight: wp("3%"),
        // elevation: 5, // Add shadow/elevation for depth

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    autocompleteList: {
        borderWidth: 0,
        width: wp("80%"),
        backgroundColor: "#fff",
    },

    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
    },

    itemIcon: {
        marginRight: wp("2%"),
    },

    item: {
        color: Colors.primaryColor,
        fontSize: wp("4%"),
        fontFamily: MontserratFont,
    },

    separator: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginHorizontal: wp("5%"),
    },
});

export default InputSearch;
