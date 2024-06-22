import { StyleSheet, Image, Platform, View, ScrollView } from "react-native";
import CategoryCard from "@/components/category/CategoryCard";
import InputSearch from "@/components/home/InputSearch";
export default function TabTwoScreen() {
    return (
        <ScrollView>
            <View style={styles.continer}>
                <View style={styles.searchContainer}>
                    <InputSearch setSearchQuery={() => {}} />
                </View>
                {/* <ScrollView> */}
                <CategoryCard />
                <CategoryCard />
                {/* </ScrollView> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        zIndex: 1, // Ensure it is above the ScrollView
    },
    continer: {
        flex: 1,
        backgroundColor:"#fff"
    },
});
