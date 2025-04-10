import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

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
        title: 'Manage Your Wardrobe',
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

    const handleDone = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        router.replace("/launch");
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.slide}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.bottomSheet}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </View>
    );

    const renderNextButton = () => (
        <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
        </View>
    );

    const renderDoneButton = () => (
        <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
        </View>
    );

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            onDone={handleDone}
            showSkipButton={true}
            onSkip={handleDone}
            renderNextButton={renderNextButton}
            renderDoneButton={renderDoneButton}
            activeDotStyle={styles.activeDot}
            dotStyle={styles.dot}
        />
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: '#FDF8F6', // màu nền giống demo
    },
    imageContainer: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        height: height * 0.55,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bottomSheet: {
        flex: 0.45,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 100,
        paddingBottom: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height * 0.35,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#E9957C',
        textAlign: 'center',
        marginBottom: 15,
    },
    text: {
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#E9957C',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginBottom: 20,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EEDDD3',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#E9957C',
        width: 20,
        height: 8,
        borderRadius: 4,
    },
});
