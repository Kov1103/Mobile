import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TitleText from './text/TitleText';

interface TitleHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, showBackButton = true }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <TitleText style={styles.title}>{title}</TitleText>
      <View style={styles.placeholder} /> {/* For spacing symmetry */}
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: '#F4B5A4',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40, // same width as back icon container
  },
});
