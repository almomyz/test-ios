import React, { useEffect, useCallback, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import InputSearch from "@/components/home/InputSearch";
import { Colors } from "@/constants/Colors";
import { MontserratFont } from "@/constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProductCard from "@/components/home/ProductCard";
import FilterComponent from "@/app/FilterComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/hooks/stores/fetchProducts";
import { Product } from "@/models/Product";
import LoadingCard from "@/components/LoadingCard";
import { useFilter } from "@/hooks/context/FilterContext";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const renderProductItem = ({ item }: { item: Product | null }) => {
    if (!item) {
        return <LoadingCard />;
    }
    return (
        <View style={styles.containerList}>
            <ProductCard key={item.id} product={item} />
        </View>
    );
};

type ListHeaderProps = {
    toggleModal: () => void;
    setSearchQuery: (query: string) => void;
    filteredProductsCount: number;
    searchQuery: string;
    handleItemSelect: (item: string) => void;
    data: string[];
    isHide: boolean;
};

const ListHeader = React.memo(
    ({
        toggleModal,
        setSearchQuery,
        filteredProductsCount,
        searchQuery,
        data,
        handleItemSelect,
        isHide,
    }: ListHeaderProps) => (
        <View>
            <View style={styles.inupt}>
                <InputSearch
                    data={data}
                    handleItemSelect={handleItemSelect}
                    setSearchQuery={setSearchQuery}
                    hideList={isHide}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {searchQuery || "Products"}
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Icon
                        name="filter-alt"
                        size={wp("7.5%")}
                        color={Colors.primaryColor}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemCount}>
                {filteredProductsCount} results
            </Text>
        </View>
    )
);

export default function Products() {
    const { state, dispatch } = useFilter();
    const {
        brands,
        selectedBrands,
        categories,
        selectedCategories,
        stores,
        selectedStores,
        priceRange,
        search,
        page,
    } = state;
    const [minPrice, maxPrice] = priceRange;
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [productsList, setProductsList] = React.useState<Product[]>([]);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [hideList, setHideList] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ["products", state],
        queryFn: () =>
            fetchProducts({ ...state, priceRange: [minPrice, maxPrice] }, page),
    });
    const datasuggestion = [
        "iphone",
        "samsung",
        "xiaomi",
        "oneplus",
        "redmi",
        "nokia",
        "sony",
        "huawei",
    ];

    useEffect(() => {
        if (data) {
            if (page === 1) {
                setProductsList(data.products);
            } else {
                setShowActivityIndicator(true);
                console.log("newPage1", showActivityIndicator);
                setProductsList((prevProducts) => [
                    ...prevProducts,
                    ...data.products,
                ]);
            }
        }
    }, [data, isLoading, page]);

    useFocusEffect(
        useCallback(() => {
            // This effect runs when the screen comes into focus
            return () => {
                // This cleanup runs when the screen loses focus
                dispatch({ type: "SET_SEARCH", payload: "" });
                dispatch({ type: "RESET_FILTERS" });
            };
        }, [])
    );

    const handleItemSelect = (item: string) => {
        console.log("Selected Item:", item);
        setHideList(true);
        dispatch({ type: "SET_SEARCH", payload: item });

        // Handle the selected item
    };

    const setSearchQuery = (query: string) => {
        setHideList(false);
        if (query.length >= 3) {
            dispatch({ type: "SET_SEARCH", payload: query });
        }
    };

    const toggleModal = useCallback(() => {
        setModalVisible(!isModalVisible);
    }, [isModalVisible]);

    const handlePageChange = (newPage: number) => {
        setShowActivityIndicator(true);
        console.log("newPage", showActivityIndicator);
        if (
            data?.total !== undefined &&
            newPage <= Math.ceil(data.total / 20)
        ) {
            dispatch({ type: "SET_PAGE", payload: newPage });
        }
        setShowActivityIndicator(false);
        console.log("newPage", showActivityIndicator);
    };

    return (
        <View style={styles.container}>
            {error && (
                <Text style={styles.errorText}>Error: {error.message}</Text>
            )}
            <ListHeader
                toggleModal={toggleModal}
                setSearchQuery={setSearchQuery}
                filteredProductsCount={data?.total || 0}
                searchQuery={search}
                handleItemSelect={handleItemSelect}
                data={datasuggestion}
                isHide={hideList}
            />
            <FlatList
                data={productsList}
                renderItem={renderProductItem}
                style={styles.listStyle}
                ListFooterComponent={() =>
                    showActivityIndicator && (
                        <ActivityIndicator
                            size="large"
                            color={Colors.primaryColor}
                        />
                    )
                }
                numColumns={2}
                onEndReached={() => handlePageChange(page + 1)}
            />
            {isModalVisible && <FilterComponent toggleModal={toggleModal} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    containerList: {
        marginTop: hp("1%"),
    },
    headerContainer: {
        width: "100%",
        padding: wp("4%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        color: "#263C3C",
        fontFamily: MontserratFont,
    },
    icon: {},
    itemCount: {
        paddingHorizontal: wp("4%"),
        color: "#8B8B8B",
    },
    errorText: {
        color: "red",
        padding: wp("4%"),
    },
    listStyle: {
        marginLeft: wp("1%"),
        marginRight: wp("1%"),
    },
    inupt: {
        zIndex: 1,
    },
});
