import { Colors } from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TitleHeader from "@/components/shared/TitleHeader";
import ClosetContentScreen from "../closet";
import { getUser } from "@/service/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleText from "@/components/shared/text/TitleText";
import SubtitleText from "@/components/shared/text/SubtitleText";
import SwButton from "@/components/shared/SwButton";

const ClosetScreen = ({ navigation }: any) => {
  const [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");
        console.log(userId);
        const userData = await getUser(Number(userId));
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  async function logout() {
    try {
      await AsyncStorage.removeItem("user_id");
      await AsyncStorage.removeItem("token");
      router.replace("/launch");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TitleHeader title="Your Account" showBackButton={true} />
      <View style={styles.containerArea}>
        <TitleText style={styles.name}>{user?.full_name}</TitleText>
        <SubtitleText>Email: {user?.email}</SubtitleText>
        <View style={styles.buttonContainer}>
          <SwButton
            label="Logout"
            onPress={logout}
            height={41}
            width={200}
          ></SwButton>
        </View>
      </View>
    </View>
  );
};

export default ClosetScreen;

const styles = StyleSheet.create({
  containerArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 24,
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
