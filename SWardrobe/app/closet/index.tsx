import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import SwArrow from '@/components/shared/SwArrow';
import { Colors } from '@/constants/Colors';
import { Item } from '@/constants/Item';
import SwButton from '@/components/shared/SwButton';
import ItemCard from '@/components/closet/ItemCard';
import TitleText from '@/components/shared/text/TitleText';
import SubtitleText from '@/components/shared/text/SubtitleText';
import { getAllItems } from '@/service/item.service';
import Loading from '@/components/loading';

const ClosetContentScreen = ({ navigation }: any) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItems, setSelectedItems] = useState<string[]>(categories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (!id) {
          console.warn('User ID not found in AsyncStorage');
          return;
        }

        setLoading(true);
        const data = await getAllItems(id);
        setItems(data);
        setCategories(['All', ...getCategories(data)]);
        setSelectedItems(['All', ...getCategories(data)]);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const getCategories = (items: Item[]): string[] => {
    const categorySet = new Set(
      items.flatMap(item =>
        Array.isArray(item.category) ? item.category : [item.category]
      )
    );
    return Array.from(categorySet).filter(Boolean); // Remove null/undefined
  };

  const filteredItems = (category: string) => {
    if (category === 'All') return items;
    return items.filter(item => item.category.includes(category));
  };

  const handlePress = () => {
    router.push({
      pathname: '/closet/category',
      params: {
        items: JSON.stringify(filteredItems(selectedCategory)),
      },
    });
  };

  const handleButtonPress = ({ name }: { name: string }) => {
    if (name === 'All') {
      setSelectedItems(categories);
      setSelectedCategory('All');
    }
    else {
      setSelectedItems([name]);
      setSelectedCategory(name);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: Colors.white, marginBottom: 40 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: category, index }) => (
            <View style={{ paddingVertical: 2, paddingHorizontal: 2 }}>
              <SwButton
                key={index}
                label={category}
                onPress={() => {
                  handleButtonPress({ name: category });
                }}
                backgroundColor={selectedCategory === category ? Colors.pink : Colors.white}
                textColor={selectedCategory === category ? Colors.darkPink : Colors.darkPink}
                style={{ margin: 2, marginLeft: index === 0 ? 10 : 2, height: 30, borderColor: !(selectedCategory === category) ? Colors.pink : undefined, borderWidth: !(selectedCategory === category) ? 1 : 0 }}
                fontSize={12}
              />
            </View>
          )}
          keyExtractor={(item, index) => item + index}
        />
        <View style={{ height: 10 }} />
        <ScrollView style={styles.container} >
          {selectedItems.map((category, index) => (
            <View key={category || index}>
              <View style={styles.titleLine}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                  <TitleText style={styles.titleText}>{category}</TitleText>
                  <SubtitleText style={{ color: Colors.darkPink, fontSize: 15 }}>{filteredItems(category).length}</SubtitleText>
                </View>
                <SwArrow direction="right" onPress={() => handlePress()} />
              </View>
              <FlatList
                data={filteredItems(category)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10 }}>
                    <ItemCard item={item} />
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 30 }}
              />
              {filteredItems(category).length === 0 && (
                <Text style={styles.emptyText}>No items in this category</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      {loading && <Loading />}
    </View>
  );
};

export default ClosetContentScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    backgroundColor: Colors.white,
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    color: Colors.pink,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#aaa',
    paddingLeft: 10,
  },
  scrollContent: {
    alignItems: 'flex-start', // aligns children to the start horizontally
    justifyContent: 'flex-start', // optional: aligns to top vertically (default)
  }
});
