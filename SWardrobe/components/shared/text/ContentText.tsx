import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export default function ContentText(props: TextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'LeagueSpartan-Regular', color: Colors.black },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
}

