import SwButton from '@/components/shared/SwButton';
import SwLogo from '@/components/shared/SwLogo';
import SwNavigator from '@/components/shared/SwNavigator';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Palette from '@/components/closet/Palette';
import SwSelector from '@/components/shared/SwSelector';
import ItemImage from '@/components/closet/ItemImage';
import ItemCard from '@/components/closet/ItemCard';
// Define the Option type according to SwSelector's expected prop type
type Option = { label: string; value: string };

const options: Option[] = [
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'js' },
  { label: 'Python', value: 'python' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'C++', value: 'cpp' },
]; 


const HomeScreen = ({ navigation }: any) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <SwNavigator />
      {/* <SwSelector options={options} /> */}
      <ItemCard image={require('@/assets/images/item1.png')}/>
      {/* <ItemImage image={require('@/assets/images/item1.png')} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    gap: 12,
    marginBottom: 50,
  },
  footer: {
    color: '#EFAF9B',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    letterSpacing: 8,
    paddingTop: 20,
    marginBottom: 10, 
  },
});


