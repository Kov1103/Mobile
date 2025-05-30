import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/app/closet/index'; // Adjust the import path as necessary
import TitleHeader from '@/components/shared/TitleHeader';
const ClosetScreen = ({ navigation }: any) => {
    const router = useRouter();
    return (
       <View style={{ flex: 1 }}>
            <TitleHeader title="Your Closet" showBackButton={false} />
            <View style={styles.containerArea}>
                <HomeScreen navigation={navigation} />
            </View>
        </View>

    );
};

export default ClosetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerArea: {
        flex: 1,
        backgroundColor: Colors.white,
        // paddingVertical: 20,
        // paddingHorizontal: 20,
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

    }
});


