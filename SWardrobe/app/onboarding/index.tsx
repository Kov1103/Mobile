import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import TitleText from '@/components/shared/text/TitleText';
import ContentText from '@/components/shared/text/ContentText';
import SwButton from '@/components/shared/SwButton';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Scan Your Clothes',
        text: "Instantly digitize your wardrobe by scanning your clothes. No more guessing what's in your closet!",
        image: require('../../assets/images/onboarding1.png'),
    },
    {
        key: '2',
        title: 'Manage your Wardrobe',
        text: 'Organize your outfits, track what you own, and keep everything in one place.',
        image: require('../../assets/images/onboarding2.png'),
    },
    {
        key: '3',
        title: 'Mix & Match',
        text: 'Get AI-powered outfit suggestions and create stunning combinations effortlessly.',
        image: require('../../assets/images/onboarding3.png'),
    },
    // Thêm các slide khác nếu muốn
];

export default function OnboardingScreen() {
    const router = useRouter();
    const sliderRef = useRef<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleDone = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        router.replace("/launch");
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.background}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.bottomSheet}>
                <TitleText style={styles.title}>{item.title}</TitleText>
                <ContentText style={styles.text}>{item.text}</ContentText>
            </View>
        </View>
    );

    const renderPagination = () => {
        const isLastSlide = activeSlide === slides.length - 1;

        return (
            <View style={styles.paginationContainer}>
                <View style={styles.dotsWrapper}>
                    {slides.map((_, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.dot,
                                activeSlide === i ? styles.activeDot : null
                            ]}
                            onPress={() => {
                                if (sliderRef.current) {
                                    sliderRef.current.goToSlide(i);
                                    setActiveSlide(i);
                                }
                            }}
                        />
                    ))}
                </View>
                <View>
                    {isLastSlide ? (
                        <SwButton
                            label="Get Started"
                            onPress={handleDone}
                            backgroundColor={Colors.pink}
                            textColor={Colors.darkPink}
                            height={41}
                            fontSize={20}
                        />
                    ) : (
                        <SwButton
                            label="Next"
                            onPress={() => {
                                if (sliderRef.current) {
                                    sliderRef.current.goToSlide(activeSlide + 1);
                                    setActiveSlide(activeSlide + 1);
                                }
                            }}
                            backgroundColor={Colors.pink}
                            textColor={Colors.darkPink}
                            width={133}
                            height={41}
                            fontSize={20}
                        />
                    )}
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.background}>
            <AppIntroSlider
                data={slides}
                renderItem={renderItem}
                onDone={handleDone}
                showSkipButton={true}
                onSkip={handleDone}
                renderPagination={renderPagination}
                ref={sliderRef}
                onSlideChange={(index) => setActiveSlide(index)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    imageContainer: {
        borderBottomLeftRadius: 30,
        overflow: 'hidden',
        height: height * 0.6,
        backgroundColor: Colors.lightYellow
    },
    image: {
        height: '90%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 30,
    },
    bottomSheet: {
        flex: 0.45,
        paddingHorizontal: 20,
        paddingTop: 80,
        paddingBottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: Colors.pink,
        textAlign: 'center',
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        color: Colors.black,
        textAlign: 'center',
    },
    button: {
        alignSelf: 'flex-end',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.lightYellow,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.pink,
        width: 20,
        height: 8,
        borderRadius: 4,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dotsWrapper: {
        flexDirection: 'row',
    },
});
