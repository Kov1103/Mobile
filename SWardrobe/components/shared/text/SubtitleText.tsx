import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, TextStyle } from 'react-native';

type SubtitleTextProps = React.PropsWithChildren<{
    style?: TextStyle | TextStyle[];
}>;

export default function SubtitleText(props: SubtitleTextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'Poppins-Medium', color: Colors.black },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
}

