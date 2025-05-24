import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";

const options = [
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "js" },
];

interface Option {
  label: string;
  value: string;
}

interface SwSelectorProps {
  options?: Option[];
}

const SwSelector: React.FC<SwSelectorProps> = ({ options = [] }) => {
  const [language, setLanguage] = useState("java");
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === language)?.label || "Select";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onSelect = (value: string) => {
    setLanguage(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Selector Button */}
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>{selectedLabel}</Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem,
                  item.value === language && styles.optionItemSelected,
                ]}
                onPress={() => onSelect(item.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.value === language && styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SwSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 10,
    width: 328,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: Colors.darkPink,
    fontWeight: "600",
  },
  selectorButton: {
    height: 41,
    borderWidth: 0,
    borderColor: Colors.pink,
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.lightYellow,
  },
  selectedText: {
    fontSize: 16,
    color: Colors.darkPink,
    fontFamily: "Poppins-Regular",
  },
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.pink,
    borderRadius: 18,
    backgroundColor: Colors.lightYellow,
    maxHeight: 150,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionItemSelected: {
    backgroundColor: Colors.lightPink,
    borderRadius: 18,
  },
  optionText: {
    fontSize: 16,
    color: Colors.darkPink,
  },
  optionTextSelected: {
    fontWeight: "700",
  },
});
