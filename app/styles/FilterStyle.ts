import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#000",
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    bottomSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: wp("5%"),
        borderTopRightRadius: wp("5%"),
        padding: wp("5%"),
        height: hp("80%"),
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2%"),
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: hp("1%"),
    },
    headerFilterText: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: Colors.secondaryColor,
        fontFamily: MontserratFont,
    },
    headerFilterContainer: {
        flexDirection: "row",
    },
    headerText: {
        fontSize: wp("4.5%"),
        fontWeight: "bold",
        fontFamily: MontserratFont,
    },
    icon: {
        marginHorizontal: wp("1%"),
    },
    resetButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp("1%"),
        marginVertical: hp("0.5%"),
        marginHorizontal: wp("7.5%"),
        borderBottomWidth: 1,
        borderRadius: wp("4%"),
        borderBottomColor: "#ccc",
    },
    content: {
        paddingVertical: hp("1%"),
    },
    slider: {
        width: wp("80%"),
        height: hp("5%"),
        alignSelf: "center",
    },
    sliderLabelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp("80%"),
        alignSelf: "center",
    },
    sliderLabel: {
        fontSize: wp("3.5%"),
        color: "#000",
    },
    shap: {
        height: hp("0.5%"),
        width: wp("20%"),
        backgroundColor: "#E1E1E1",
        borderRadius: wp("2.5%"),
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: hp("1%"),
    },
    picker: {
        height: hp("6.5%"),
        width: wp("37.5%"),
        alignSelf: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1%"),
        marginLeft: wp("12.5%"),
    },
    checkboxLabel: {
        marginLeft: wp("2%"),
        fontSize: wp("4%"),
    },
    checkbox: {
        borderRadius: wp("1.25%"),
    },
    filterContent: {
        flexGrow: 1,
    },
    buttonContainer: {
        marginHorizontal: wp("7.5%"),
        marginTop: hp("2%"),
    },
    applyButton: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: hp("2%"),
        borderRadius: wp("2.5%"),
        alignItems: "center",
        width: "100%",
    },
    applyButtonText: {
        color: "#fff",
        fontSize: wp("4%"),
        fontWeight: "bold",
        fontFamily: MontserratFont,
    },
    resetButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: hp("2%"),
        borderRadius: wp("2.5%"),
        alignItems: "center",
        width: "48%",
    },
    resetButtonText: {
        color: Colors.primaryColor,
        fontSize: wp("4%"),
        fontWeight: "bold",
        fontFamily: MontserratFont,
    },
    showFiltersButton: {
        backgroundColor: "#588B8B",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("5%"),
        borderRadius: wp("2.5%"),
    },
    showFiltersButtonText: {
        color: "#fff",
        fontSize: wp("4%"),
    },
});
