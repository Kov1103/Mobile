import React from 'react';
import { View, Image, StyleSheet, ImageStyle } from 'react-native';
import TitleText from './text/TitleText';
import { Colors } from '@/constants/Colors';

interface SwLogoProps {
    height?: number;
    hasTitle?: boolean;
    fontSize?: number;
    isWhite?: boolean;
}

const SwLogo: React.FC<SwLogoProps> = ({ height = 100, hasTitle = true, fontSize = 45, isWhite = false }) => {
    return (
        <View style={styles.container}>
            <Image
                source={
                    isWhite
                        ? require('../../assets/icon/logo-white.png')
                        : require('../../assets/icon/logo.png')
                }
                style={[styles.logo, { height } as ImageStyle]}
                resizeMode="contain"
            />
            {hasTitle && (
                <TitleText
                    style={[
                        { fontSize, color: isWhite ? Colors.white : Colors.pink }
                    ]}
                >
                    {'SWardrobe'}
                </TitleText>
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
});

export default SwLogo;
