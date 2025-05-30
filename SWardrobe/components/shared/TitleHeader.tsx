import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TitleText from './text/TitleText';
import { Colors } from '@/constants/Colors';

interface TitleHeaderProps {
  title: string;
  showBackButton?: boolean;
  showAddButton?: boolean; 
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, showBackButton = true, showAddButton = false}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <TitleText style={styles.title}>{title}</TitleText>
      {/* <View style={styles.placeholder} /> */}
      {showAddButton ? (
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/navigate/scan")}>
          {/* <Ionicons name="add" size={24} color={Colors.lightPink} style={styles.addButton} /> */}
          <Image source={require('../../assets/icon/Add.png')} style={styles.addButton} />
        </TouchableOpacity>
      ) : <View style={styles.placeholder} />}
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    width: 31,
    height: 31,
  },
  title: {
    fontSize: 20,
    color: Colors.pink,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40, // same width as back icon container
  },
});
