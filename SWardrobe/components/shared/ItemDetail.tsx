import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Alert } from "react-native";
import ItemImage from "@/components/closet/ItemImage";
import SwTag from "@/components/shared/SwTag";
import SwColor from "@/components/shared/SwColor";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleText from "./text/TitleText";
import SubtitleText from "./text/SubtitleText";
import SwButton from "./SwButton";
import SwTextInput from "./SwTextInput";
import { postItem } from "@/service/item.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ItemDetailProps {
  image: string;
  name: string;
  category: string[];
  color: string[];
  onAddSuccess?: () => void;
}
const ItemDetailComponent: React.FC<ItemDetailProps> = ({ image, name, category, color, onAddSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isEditing]);


  async function addItem() {
    const userId = await AsyncStorage.getItem('id');
    const payload = {
      image: [image],
      name: editedName,
      category: category,
      color: color,
      user_id: Number(userId)
    }
    postItem(payload).then((res) => {
      Alert.alert("Item added successfully!");
      onAddSuccess?.();
    }).catch((err) => {
      console.error("Error adding item:", err);
      Alert.alert("Failed to add item. Please try again.");
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center' }}>
      <TouchableWithoutFeedback onPress={() => setIsEditing(false)}>
        <View style={styles.containerArea}>
          <ItemImage image={image as string} />
          <View style={styles.nameContainer}>
            {isEditing ? (
              <SwTextInput
                ref={inputRef}
                value={editedName}
                type="default"
                onChangeText={setEditedName}
                onBlur={() => setIsEditing(false)} // Khi rời input thì thoát edit mode
                style={styles.nameInput}
              />
            ) : (
              <TitleText style={styles.name}>{editedName}</TitleText>
            )}

            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Image source={require('../../assets/icon/Bot-Edit.png')} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.line}>
            <SubtitleText style={styles.text}>Categories</SubtitleText>
            <View style={styles.itemLine}>
              {Array.isArray(category) && category.length > 0 ? (
                category.map((cat: string, index: number) => (
                  <SwTag key={index} text={cat} />
                ))
              ) : (
                <Text>No category is picked</Text>
              )}
            </View>
          </View>

          <View style={styles.line}>
            <SubtitleText style={styles.text}>Colors</SubtitleText>
            <View style={styles.itemLine}>
              {color.map((col: string, index: number) => (
                <SwColor key={index} color={col} />
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <SwButton label="Add" onPress={addItem} backgroundColor={Colors.pink} textColor={Colors.darkPink} width="50%" height={41}></SwButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default ItemDetailComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerArea: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  nameInput: {
    height: 30,
    paddingVertical: 0
  },
  text: {
    fontSize: 15,
    color: Colors.darkPink,
    marginVertical: 10,
  },
  name: {
    fontSize: 20,
    color: Colors.black,
  },
  line: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 4,
  },
  itemLine: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  }
});
