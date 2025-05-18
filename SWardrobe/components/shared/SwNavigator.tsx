import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';

interface SwNavigatorProps {
  height?: number;
}

const tabs = [
  {
    name: 'home',
    icon: require('../../assets/icon/Nav_Home.png'),
    iconActive: require('../../assets/icon/Nav_Home-picked.png'),
    path: '/home',
    isScan: false,
  },
  {
    name: 'closet',
    icon: require('../../assets/icon/Nav_Closet.png'),
    iconActive: require('../../assets/icon/Nav_Closet-picked.png'),
    path: '/closet',
    isScan: false,
  },
  {
    name: 'scan',
    icon: require('../../assets/icon/Nav_Scan.png'),
    isScan: true,
    path: '/scan',
    iconActive: null
  },
  {
    name: 'hanger',
    icon: require('../../assets/icon/Nav_Hanger.png'),
    iconActive: require('../../assets/icon/Nav_Hanger-picked.png'),
    path: '/hanger',
    isScan: false,
  },
  {
    name: 'account',
    icon: require('../../assets/icon/Nav_Account.png'),
    iconActive: require('../../assets/icon/Nav_Account-picked.png'),
    path: '/account',
    isScan: false,
  },
];

const SwNavigator: React.FC<SwNavigatorProps> = ({ height = 73 }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const currentRoute = route.name;

  return (
    <View style={[styles.container, { height }]}>
      {tabs.map((tab) => {
        const isActive = currentRoute.startsWith(tab.name);
        const wrapperStyle = tab.isScan
          ? [
              styles.scanWrapper,
            ]
          : styles.iconWrapper;

        return (
          <TouchableOpacity
            key={tab.name}
            style={wrapperStyle}
            onPress={() => router.push(tab.path as any)}
          >
            <Image
              source={isActive ? tab.iconActive : tab.icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: Colors.white,
        borderTopWidth: 0.5,
        borderTopColor: Colors.lightPink,
    },
    iconWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    scanWrapper: {
        marginHorizontal: 16,
        width: 58,
        height: 58,
        borderRadius: 32,
        backgroundColor: Colors.pink, // chỉnh theo màu bạn muốn
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 40,
        height: 40,
    },
});

export default SwNavigator;
