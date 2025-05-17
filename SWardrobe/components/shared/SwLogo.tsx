import React from 'react';
import { View, Image, Text, StyleSheet, ImageStyle } from 'react-native';

interface SwLogoProps {
    height?: number;
    hasTitle?: boolean;
}

const SwLogo: React.FC<SwLogoProps> = ({ height = 100, hasTitle = true }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={[styles.logo, { height } as ImageStyle]}
                resizeMode="contain"
            />
            {hasTitle && <Text style={styles.title}>SWardrobe</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        marginBottom: 20,
        aspectRatio: 1, // giữ tỉ lệ hình vuông khi thay đổi chiều cao
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#EFAF9B',
    },
});

export default SwLogo;
