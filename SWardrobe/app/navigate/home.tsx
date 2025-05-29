import SwTipCard from '@/components/shared/SwTipCard';
import ContentText from '@/components/shared/text/ContentText';
import TitleText from '@/components/shared/text/TitleText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerArea}>
                <View style={styles.welcomeContainer}>
                    <View style={styles.welcomeText}>
                        <TitleText style={{ color: Colors.pink, fontSize: 24 }}>Hi, Welcome Back!</TitleText>
                        <ContentText>Have a nice day!</ContentText>
                    </View>
                    <Image style={styles.welcomeImage} source={require('../../assets/images/HomeWelcome.png')}></Image>
                </View>
                <View style={styles.bannerContainer}>
                    <Image style={styles.banner} source={require('../../assets/images/Banner.png')}></Image>
                </View>
                <View style={styles.blogList}>
                    <SwTipCard title='Tips Of A Day' subtitle='How to choose clothers' rating={4.5} image={require('@/assets/images/item1.png')}></SwTipCard>
                </View>
                <View style={styles.blogList}>
                    <SwTipCard title='Trending Clothes' subtitle='Explore now!' rating={4.5} image={require('@/assets/images/item2.png')}></SwTipCard>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    containerArea: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    welcomeContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    welcomeText: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    welcomeImage: {
        width: 135,
        marginBottom: 20,
    },
    bannerContainer: {
    },
    banner: {
        width: '100%',
        borderRadius: 20,
        marginBottom: 20,
    },
    blogList: {
        paddingVertical: 10,
    }
});


