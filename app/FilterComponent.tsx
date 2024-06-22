import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";
import Accordion from "react-native-collapsible/Accordion";
import Modal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import { styles } from "./styles/FilterStyle";
import { useFilters } from "@/hooks/stores/useFilters";
import { useFilter } from "@/hooks/context/FilterContext";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface FilterComponentProps {
    toggleModal: () => void;
}

interface Section {
    title: string;
    content: JSX.Element | JSX.Element[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ toggleModal }) => {
    const { state, dispatch } = useFilter();

    const {
        data: filtersData,
        error: filtersError,
        isLoading: filtersLoading,
    } = useFilters();

    const handleApplyFilters = () => {
        if (filtersData) {
            const brandIds = filtersData.brands.map((brand) => brand.id);
            const categoryIds = filtersData.categories.map(
                (category) => category.id
            );
            const storeIds = filtersData.stores.map((store) => store.id);

            dispatch({ type: "SET_BRANDS", payload: brandIds });
            dispatch({ type: "SET_CATEGORIES", payload: categoryIds });
            dispatch({ type: "SET_STORES", payload: storeIds });

            // Close the modal after applying filters
            toggleModal();
        }
    };

    const handleResetFilters = () => {
        dispatch({ type: "RESET_FILTERS" }); // assuming RESET_FILTERS resets all filters to their initial state
    };

    const toggleCategory = (category: number) => {
        console.log("Toggle Category:", category);
        const updatedCategories = state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((cat) => cat !== category)
            : [...state.selectedCategories, category];
        dispatch({
            type: "SET_SELECTED_CATEGORIES",
            payload: updatedCategories,
        });
    };

    const toggleBrand = (brandId: number) => {
        console.log("Toggle Brand:", brandId);
        const updatedBrands = state.selectedBrands.includes(brandId)
            ? state.selectedBrands.filter((b) => b !== brandId)
            : [...state.selectedBrands, brandId];
        dispatch({ type: "SET_SELECTED_BRANDS", payload: updatedBrands });
    };

    const toggleStore = (store: number) => {
        console.log("Toggle Store:", store);
        const updatedStores = state.selectedStores.includes(store)
            ? state.selectedStores.filter((s) => s !== store)
            : [...state.selectedStores, store];
        dispatch({ type: "SET_SELECTED_STORES", payload: updatedStores });
    };

    const SECTIONS: Section[] = [
        {
            title: "Price",
            content: (
                <>
                    <Slider
                        style={styles.slider}
                        minimumValue={10}
                        maximumValue={10000}
                        value={state.priceRange[1]}
                        onValueChange={(value) =>
                            dispatch({
                                type: "SET_PRICE_RANGE",
                                payload: [10, value],
                            })
                        }
                        minimumTrackTintColor={Colors.secondaryColor}
                        maximumTrackTintColor="#000000"
                        thumbTintColor={Colors.secondaryColor}
                    />
                    <View style={styles.sliderLabelContainer}>
                        <Text style={styles.sliderLabel}>
                            {!isNaN(state.priceRange[1])
                                ? Math.floor(state.priceRange[1])
                                : 10}
                        </Text>

                        <Text style={styles.sliderLabel}>10000</Text>
                    </View>
                </>
            ),
        },
        {
            title: "Category",
            content:
                filtersData?.categories.map((category) => (
                    <View key={category.id} style={styles.checkboxContainer}>
                        <Checkbox
                            value={state.selectedCategories.includes(
                                category.id
                            )}
                            onValueChange={() => toggleCategory(category.id)}
                            color={Colors.secondaryColor}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkboxLabel}>
                            {category.Name}
                        </Text>
                    </View>
                )) || [],
        },
        {
            title: "Brand",
            content:
                filtersData?.brands.map((brand) => (
                    <View key={brand.id} style={styles.checkboxContainer}>
                        <Checkbox
                            value={state.selectedBrands.includes(brand.id)}
                            onValueChange={() => toggleBrand(brand.id)}
                            color={Colors.secondaryColor}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkboxLabel}>{brand.Name}</Text>
                    </View>
                )) || [],
        },
        {
            title: "Store",
            content:
                filtersData?.stores.map((store) => (
                    <View key={store.id} style={styles.checkboxContainer}>
                        <Checkbox
                            value={state.selectedStores.includes(store.id)}
                            onValueChange={() => toggleStore(store.id)}
                            color={Colors.secondaryColor}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkboxLabel}>{store.Name}</Text>
                    </View>
                )) || [],
        },
    ];

    useEffect(() => {
        console.log("State updated:", state);
    }, [state.selectedCategories, state.selectedBrands, state.selectedStores]);

    const renderHeader = (section: Section, _: number, isActive: boolean) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
                <Icon
                    name={isActive ? "expand-less" : "expand-more"}
                    size={wp("6%")}
                />
            </View>
        );
    };

    const renderContent = (section: Section) => {
        return <View style={styles.content}>{section.content}</View>;
    };

    const [activeSections, setActiveSections] = useState<number[]>([]);

    const updateSections = (activeSections: number[]) => {
        setActiveSections(activeSections);
    };

    if (filtersLoading) {
        return <ActivityIndicator size="large" color={Colors.primaryColor} />;
    }

    if (filtersError) {
        return <Text>Error loading filters</Text>;
    }

    return (
        <View style={styles.container}>
            <Modal
                isVisible={true}
                onSwipeComplete={toggleModal}
                style={styles.modal}
                onBackdropPress={toggleModal}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.shap} />
                    <View style={styles.headerContainer}>
                        <View style={styles.headerFilterContainer}>
                            <Icon
                                name="filter-alt"
                                size={wp("7.5%")}
                                color={Colors.primaryColor}
                                style={styles.icon}
                            />
                            <Text style={styles.headerFilterText}>Filters</Text>
                        </View>
                        <Icon
                            name="close"
                            size={wp("7.5%")}
                            color={"#989696"}
                            style={styles.icon}
                            onPress={toggleModal}
                        />
                    </View>

                    <ScrollView style={styles.filterContent}>
                        <Accordion
                            sections={SECTIONS}
                            activeSections={activeSections}
                            renderHeader={renderHeader}
                            renderContent={renderContent}
                            onChange={updateSections}
                            underlayColor="transparent"
                            expandMultiple={true}
                        />
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={handleApplyFilters}
                        >
                            <Text style={styles.applyButtonText}>
                                Apply Filter
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={handleResetFilters}
                        >
                            <Text style={styles.resetButtonText}>
                                Reset Filter
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FilterComponent;
