import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleHeader from '@/components/shared/TitleHeader';
import ClosetContentScreen from '../closet';

const ClosetScreen = ({ navigation }: any) => {
    return (
       <View style={{ flex: 1 }}>
            <TitleHeader title="Your Closet" showBackButton={true} showAddButton={true} />
            <View style={styles.containerArea}>
                <ClosetContentScreen navigation={navigation} />
            </View>
        </View>

    );
};

export default ClosetScreen;

const styles = StyleSheet.create({
    containerArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});


