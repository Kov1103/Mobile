import React from "react";
import ItemImage from "@/components/closet/ItemImage";
import { View, Text } from "react-native";
import SwTag from "@/components/shared/SwTag";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { Colors } from "@/constants/Colors";
import SwColor from "@/components/shared/SwColor";
import { Item } from "@/constants/Item";

export default function DetailScreen({image, name, category, color} : {image: string, name: string, category: string[], color: string[]}) {
    return (
        <View>
            <ItemImage image={image} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.line}>
                <Text style={styles.text}>Category</Text>
                {category.map((category, index) => (
                    <SwTag key={index} text={category} />
                ))}
            </View>
            <View style={styles.line}>
                <Text style={styles.text}>Colors</Text>
                {color.map((color, index) => (
                    <SwColor key={index} color={color} />
                ))}
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: Colors.pink,
        marginVertical: 10,
        fontFamily: 'League Spartan',
        fontWeight: 'bold',
    },
    name:{
        fontSize: 24,
        fontFamily: 'League Spartan',
        color: '#4B4544',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    line: {
        paddingBottom: 20,
    }
});