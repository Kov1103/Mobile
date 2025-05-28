import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const SwTag = ({text,style}: {
    text: string;
    style?: object;
}) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <View style={[styles.tag, isSelected ? styles.tagSelected : {}, style]}>
            <Text style={{ fontFamily: 'League Spartan', fontSize: 14, color: '#000' }}>
                {text}
            </Text>
        </View>
    );
}

export default SwTag;

const styles = StyleSheet.create({
    tag: {
        backgroundColor: Colors.lightYellow,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    tagText: {
        fontFamily: 'League Spartan',
        fontSize: 14,
        color: '#000',
    },
    tagSelected: {
        backgroundColor: Colors.lightPink,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    tagTextSelected: {
        fontFamily: 'League Spartan',
        fontSize: 14,
        color: Colors.white,
    },
});