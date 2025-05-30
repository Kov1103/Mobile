// ScanResultModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import TitleHeader from '../shared/TitleHeader';
import ItemDetailComponent from '../shared/ItemDetail';

type Props = {
    visible: boolean;
    data?: any;
    onClose: () => void;
};

export default function ScanResultModal({ visible, data, onClose }: Props) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.container}>
                            <TitleHeader title="Your Item" showBackButton={false} />
                            <ItemDetailComponent image={data?.image} name={data?.name} category={data?.category} color={data?.color} onAddSuccess={onClose}></ItemDetailComponent>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(244, 181, 164, 0.39)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        height: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
