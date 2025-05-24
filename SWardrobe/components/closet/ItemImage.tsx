import React from 'react';
import {View, Image} from 'react-native';
import {Colors} from '@/constants/Colors';
import {StyleSheet} from 'react-native';

interface ItemImageProps {
    image: any; // require(...) hoặc uri
    height?: number;
    width?: number;
}

const ItemImage: React.FC<ItemImageProps> = ({image}) => {
    return (
        <View style={styles.background}>
            <Image source={image} style={styles.image} />
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.lightYellow,
        borderRadius: 10,
        height: '40%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '65%',
        height: '65%',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
    }            
});
export default ItemImage;