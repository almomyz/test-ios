import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImageViewer from "react-native-image-zoom-viewer";
import { Colors } from "@/constants/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Photo {
    Photo_URL: string;
}

interface CarouselComponentProps {
    productPhotos: Photo[];
    available: number;
}

interface DotsProps {
    activeIndex: number;
    total: number;
}

const Dots: React.FC<DotsProps> = ({ activeIndex, total }) => {
    return (
        <View style={styles.dotsContainer}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index
                            ? styles.activeDot
                            : styles.inactiveDot,
                    ]}
                />
            ))}
        </View>
    );
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({
    productPhotos,
    available,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const images = productPhotos.map((photo) => ({ url: photo.Photo_URL }));

    const handleImagePress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.banner,
                    available
                        ? styles.availableBanner
                        : styles.unavailableBanner,
                ]}
            >
                <Text style={styles.bannerText}>
                    {available ? "Available" : "Unavailable"}
                </Text>
            </View>
            <Carousel
                width={wp("100%")}
                height={hp("35%")}
                data={productPhotos}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableWithoutFeedback onPress={handleImagePress}>
                            <Image
                                source={{ uri: item.Photo_URL }}
                                style={styles.image}
                            />
                        </TouchableWithoutFeedback>
                        <Dots
                            activeIndex={activeIndex}
                            total={productPhotos.length}
                        />
                    </View>
                )}
                onSnapToItem={(index: number) => setActiveIndex(index)}
                autoPlay={true}
                autoPlayInterval={3000} // 3 seconds interval
            />

            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={handleCloseModal}
                style={styles.modal}
            >
                <View style={styles.imageViewerContainer}>
                    <ImageViewer
                        style={styles.imageViewer}
                        imageUrls={images}
                        index={activeIndex}
                        onClick={handleCloseModal}
                        backgroundColor="#fff"
                        renderImage={(props) => (
                            <Image {...props} style={styles.modalImage} />
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    banner: {
        position: "absolute",
        top: hp("2%"),
        right: -wp("35%"),
        paddingVertical: hp("0.5%"),
        transform: [{ rotate: "45deg" }],
        zIndex: 1,
        width: wp("100%"),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    availableBanner: {
        backgroundColor: Colors.secondaryColor,
    },
    unavailableBanner: {
        backgroundColor: "red",
    },
    bannerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: wp("20%"),
    },
    itemContainer: {
        width: wp("100%"),
        height: hp("35%"),
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    image: {
        height: hp("25%"),
        width: "100%",
        resizeMode: "contain",
    },
    modal: {
        flex: 1,
        backgroundColor: "green",
    },
    dotsContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: hp("1%"), // Adjust this value to position dots higher or lower
    },
    dot: {
        width: wp("2.5%"),
        height: wp("2.5%"),
        borderRadius: wp("1.25%"),
        marginHorizontal: wp("1%"),
    },
    activeDot: {
        backgroundColor: Colors.primaryColor,
    },
    inactiveDot: {
        backgroundColor: Colors.secondaryColor,
    },
    imageViewerContainer: {
        flex: 1,
        margin: wp("5%"),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    imageViewer: {
        width: wp("100%"),
    },
    modalImage: {
        width: "100%",
        height: "80%",
        resizeMode: "contain",
    },
});

export default CarouselComponent;
