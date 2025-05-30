import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SubtitleText from './text/SubtitleText';

const SwTag = ({text,style}: {
    text: string;
    style?: object;
}) => {
    const [isSelected, setIsSelected] = useState(true);
    return (
        <View style={[isSelected ? styles.tagSelected : styles.tag, style]}>
            <SubtitleText style={styles.tagText}>
                {text}
            </SubtitleText>
        </View>
    );
}

export default SwTag;

const styles = StyleSheet.create({
    tag: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        // alignSelf: 'flex-start', 
        },
    tagText: {
        fontSize: 14,
        color: Colors.darkPink
    },
    tagSelected: {
        backgroundColor: Colors.pink,
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