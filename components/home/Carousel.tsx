import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Colors } from "@/constants/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Slide {
    id: string;
    title: string;
    image: string;
    logo: string;
}

const data: Slide[] = [
    {
        id: "1",
        title: "Slide 1",
        image: "https://media.extra.com/i/aurora/MS24_Hikvision_Smarthome_HS_A",
        logo: "https://firebasestorage.googleapis.com/v0/b/mlproject-60be1.appspot.com/o/photo_2024-05-29_14-38-16-removebg-preview.png?alt=media&token=bf0917b9-2f73-4940-9470-4d41d0838b14",
    },
    {
        id: "2",
        title: "Slide 2",
        image: "https://www.abdulwahed.com/media/wysiwyg/vacuum-offer.jpg",
        logo: "https://firebasestorage.googleapis.com/v0/b/mlproject-60be1.appspot.com/o/aaaw_logo_1_ar__1_-removebg-preview.png?alt=media&token=b1e36cbf-ec2e-4289-93c4-4b397d9609b7",
    },
    {
        id: "3",
        title: "Slide 3",
        image: "https://www.abdulwahed.com/media/wysiwyg/phone-great-offer.jpg",
        logo: "https://firebasestorage.googleapis.com/v0/b/mlproject-60be1.appspot.com/o/aaaw_logo_1_ar__1_-removebg-preview.png?alt=media&token=b1e36cbf-ec2e-4289-93c4-4b397d9609b7",
    },
    {
        id: "4",
        title: "Slide 4",
        image: "https://m.dev-almanea.com/media/webps/jpg/media/json/images/slider/a/l/almanea_website_banner_1760x642_1.webp",
        logo: "https://firebasestorage.googleapis.com/v0/b/mlproject-60be1.appspot.com/o/photo_2024-05-29_14-36-22-removebg-preview.png?alt=media&token=5d0f12ba-2c6f-4825-b24c-242916ef70ce",
    },
];

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

const CarouselComponent: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Carousel
                width={wp("100%")}
                height={hp("35%")}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                        <Image
                            source={{ uri: item.logo }}
                            style={styles.logo}
                        />
                    </View>
                )}
                onSnapToItem={(index: number) => setActiveIndex(index)}
                autoPlay={true}
                autoPlayInterval={3000} // 3 seconds interval
            />
            <Dots activeIndex={activeIndex} total={data.length} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        width: wp("100%"),
        height: hp("35%"),
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    image: {
        flex: 1,
        height: "auto",
        width: "100%",
        resizeMode: "contain", // Changed to 'cover' to maintain aspect ratio
    },
    logo: {
        position: "absolute",
        bottom: hp("1.5%"),
        left: hp("1.5%"),
        width: wp("12.5%"),
        height: hp("6%"),
        resizeMode: "contain",
        shadowColor: "#000", // Black shadow color
        shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 4, // Blur radius of 4
        elevation: 5, // For Android shadow
    },
    dotsContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: hp("2%"), // Adjust this value to position dots higher or lower
    },
    dot: {
        width: wp("2.5%"),
        height: wp("2.5%"),
        borderRadius: wp("1.25%"),
        marginHorizontal: wp("1.25%"),
        elevation: 5,
    },
    activeDot: {
        backgroundColor: Colors.primaryColor,
    },
    inactiveDot: {
        backgroundColor: Colors.secondaryColor,
    },
});

export default CarouselComponent;
