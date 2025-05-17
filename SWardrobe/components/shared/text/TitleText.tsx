import React from 'react';
import { Text, TextStyle } from 'react-native';

type TitleTextProps = React.PropsWithChildren<{
    style?: TextStyle | TextStyle[];
}>;

export default function TitleText(props: TitleTextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'Poppins-SemiBold' },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
}

