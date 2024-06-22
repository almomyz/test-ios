import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const InputSearch = ({ setSearchQuery }: { setSearchQuery: (query: string) => void }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (text: string) => {
    setQuery(text);
    setSearchQuery(text);
  };

  return (
    <View style={styles.inputContainerStyle}>
      <View style={styles.inputWrapper}>
        <Icon
          name="search"
          size={25}
          color={Colors.primaryColor}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by product name or URL"
          placeholderTextColor="#989696"
          cursorColor={Colors.primaryColor}
          onChangeText={handleInputChange}
          value={query}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    paddingLeft: wp('3%'),  // Equal left padding
    paddingRight: wp('3%'),  // Equal right padding
    height: hp('5%'),  // Adjusted for responsive height
    borderRadius: 25,
    borderColor: Colors.primaryColor,
    width: wp('90%'),  // Adjusted for responsive width
    alignItems: "center",
    marginHorizontal: wp('5%'),  // Equal horizontal margin
    marginTop: hp('6%'),  // Adjusted for responsive margin
    marginBottom: hp('2.5%'),  // Adjusted for responsive margin
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    position: "relative",
  },

  input: {
    flex: 1,
    color: Colors.primaryColor,
    paddingLeft: wp('3%'),  // Equal left padding inside the input
    paddingRight: wp('3%'),  // Equal right padding inside the input
  },
});

export default InputSearch;
