import React from 'react';
import { View, Image, Text, StyleSheet, ImageStyle } from 'react-native';
import TitleText from './text/TitleText';

interface SwLogoProps {
    height?: number;
    hasTitle?: boolean;
    fontSize?: number;
}

const SwLogo: React.FC<SwLogoProps> = ({ height = 100, hasTitle = true, fontSize = 45 }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={[styles.logo, { height } as ImageStyle]}
                resizeMode="contain"
            />
            {hasTitle && (
                <TitleText style={[styles.title, { fontSize }]}>{'SWardrobe'}</TitleText>
            )}
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
        color: '#EFAF9B',
    },
});

export default SwLogo;
