import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import TitleText from './text/TitleText';
import { Colors } from '@/constants/Colors';
interface SwButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;  // sửa lại đây
  height?: DimensionValue; // sửa lại đây
  style?: StyleProp<ViewStyle>;
}

const SwButton: React.FC<SwButtonProps> = ({
  label,
  onPress,
  backgroundColor = Colors.pink,
  textColor = Colors.white,
  width,
  height,
  style,
}) => {
  const customStyle: ViewStyle = {
    backgroundColor,
  };

  if (width !== undefined) {
    customStyle.width = width;
  }

  if (height !== undefined) {
    customStyle.height = height;
  }

  return (
    <TouchableOpacity style={[styles.button, customStyle, style]} onPress={onPress}>
      {/* <Text style={[styles.text, { color: textColor }]}>{label}</Text> */}
      <TitleText style={{ fontSize: 20, color: textColor }}>
        {label}
      </TitleText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SwButton;
