import React from 'react';
import { Text, TextStyle } from 'react-native';

type ContentTextProps = React.PropsWithChildren<{
    style?: TextStyle | TextStyle[];
}>;

export default function ContentText(props: ContentTextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'LeagueSpartan-Regular' },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
}

