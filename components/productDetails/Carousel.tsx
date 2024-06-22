import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Colors } from "@/constants/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Photo {
  Photo_URL: string;
}

interface CarouselComponentProps {
  productPhotos: Photo[];
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
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({ productPhotos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        width={wp('100%')}
        height={hp('35%')}
        data={productPhotos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.Photo_URL }} style={styles.image} />
            <Dots activeIndex={activeIndex} total={productPhotos.length} />
          </View>
        )}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        autoPlay={true}
        autoPlayInterval={3000} // 3 seconds interval
      />
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
    width: wp('100%'),
    height: hp('30%'),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    height: hp('25%'),
    width: "100%",
    resizeMode: "contain",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: hp('-1%'), // Adjust this value to position dots higher or lower
  },
  dot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: Colors.primaryColor,
  },
  inactiveDot: {
    backgroundColor: Colors.secondaryColor,
  },
});

export default CarouselComponent;
