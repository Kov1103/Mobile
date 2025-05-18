import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ContentText from './text/ContentText';

interface TipsCardProps {
  title: string;
  subtitle: string;
  rating: number;
  image: any; // require(...) hoặc uri
}

const SwTipCard: React.FC<TipsCardProps> = ({ title, subtitle, rating, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={12} color={Colors.pink} />
            <ContentText style={{paddingTop: 3}}>{rating.toFixed(1)}</ContentText>
          </View>

          <TouchableOpacity style={styles.readNowButton}>
            <ContentText>Read Now</ContentText>
          </TouchableOpacity>
        </View>
      </View>

      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.pink,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  readNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SwTipCard;
