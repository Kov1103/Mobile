import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, TextStyle } from 'react-native';

type BoldContentTextProps = React.PropsWithChildren<{
    style?: TextStyle | TextStyle[];
}>;

export default function BoldContentText(props: BoldContentTextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'LeagueSpartan-SemiBold', color: Colors.black },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
}

