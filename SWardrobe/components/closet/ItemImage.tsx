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
            <Image source={{uri: image}} style={styles.image} />
        </View>
    );
}
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.lightYellow,
        borderRadius: '2%',
        height: Dimensions.get('window').height*0.35,
        width: Dimensions.get('window').width*0.8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
    }            
});
export default ItemImage;