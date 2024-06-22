// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import Modal from "react-native-modal";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import FilterComponent from "@/app/FilterComponent"; // Adjust the import path according to your project structure
// import { Colors } from "@/constants/Colors";
// import { MontserratFont } from "@/constants/Fonts";

// const BottomSheetComponent: React.FC = () => {
//     const [isModalVisible, setModalVisible] = useState(false);

//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };

//     return (
//         <View style={styles.container}>
//             <Button title="Show Filters" onPress={toggleModal} />
//             <Modal
//                 isVisible={isModalVisible}
//                 swipeDirection="down"
//                 onSwipeComplete={toggleModal}
//                 style={styles.modal}
//                 onBackdropPress={toggleModal}
//             >
//                 <View style={styles.bottomSheet}>
//                     <FilterComponent toggleModal={toggleModal} />
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     modal: {
//         justifyContent: "flex-end",
//         margin: 0,
//     },
//     bottomSheet: {
//         backgroundColor: "#fff",
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         padding: 20,
//         height: "80%",
//     },
//     headerContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//         borderBottomColor: "#ccc",
//         borderBottomWidth: 1,
//         paddingBottom: 10,
//     },
//     headerFilterText: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: Colors.secondaryColor,
//         fontFamily: MontserratFont,
//     },
//     headerFilterContainer: {
//         flexDirection: "row",
//     },
//     icon: {
//         marginHorizontal: 5,
//     },
// });

// export default BottomSheetComponent;
