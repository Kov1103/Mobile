import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SwNavigatorProps {
  height?: number;
}

const tabs = [
  {
    name: 'home',
    icon: require('../../assets/icon/Nav_Home.png'),
    iconActive: require('../../assets/icon/Nav_Home-picked.png'),
    path: '/navigate/home',
    isScan: false,
  },
  {
    name: 'closet',
    icon: require('../../assets/icon/Nav_Closet.png'),
    iconActive: require('../../assets/icon/Nav_Closet-picked.png'),
    path: '/navigate/closet',
    isScan: false,
  },
  {
    name: 'scan',
    icon: require('../../assets/icon/Nav_Scan.png'),
    isScan: true,
    path: '/scan',
    iconActive: require('../../assets/icon/Nav_Scan.png'),
  },
  {
    name: 'hanger',
    icon: require('../../assets/icon/Nav_Hanger.png'),
    iconActive: require('../../assets/icon/Nav_Hanger-picked.png'),
    path: '/navigate/hanger',
    isScan: false,
  },
  {
    name: 'account',
    icon: require('../../assets/icon/Nav_Account.png'),
    iconActive: require('../../assets/icon/Nav_Account-picked.png'),
    path: '/navigate/account',
    isScan: false,
  },
];

const SwNavigator: React.FC<SwNavigatorProps> = ({ height = 73 }) => {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height: height + insets.bottom, paddingBottom: insets.bottom }]}>
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.name);
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
              style={tab.isScan ? styles.scanIcon : styles.icon}
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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.darkPink, // chỉnh theo màu bạn muốn
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 24,
    },
    icon: {
        width: 40,
        height: 40,
    },
    scanIcon: {
        width: 56,
        height: 56,
    }
});

export default SwNavigator;
