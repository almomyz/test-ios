// styles.js
import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "80%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  headerFilterText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondaryColor,
    fontFamily: MontserratFont,
  },
  headerFilterContainer: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: MontserratFont,
  },
  icon: {
    marginHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderRadius: 15,
    borderBottomColor: "#ccc",
  },
  content: {
    paddingVertical: 10,
  },
  slider: {
    width: "80%",
    height: 40,
    alignSelf: "center",
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  sliderLabel: {
    fontSize: 14,
    color: "#000",
  },
  shap: {
    height: 5,
    width: 80,
    backgroundColor: "#E1E1E1",
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 50,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkbox: {
    borderRadius: 5,
  },
  filterContent: {
    flex: 1,
  },
  applyButton: {
    backgroundColor: Colors.secondaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: MontserratFont,
  },
  showFiltersButton: {
    backgroundColor: "#588B8B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  showFiltersButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
