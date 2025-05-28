import SwButton from "@/components/shared/SwButton";
import ContentText from "@/components/shared/text/ContentText";
import TitleHeader from "@/components/shared/TitleHeader";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useScanContext } from "./scan.context";

export default function ScanScreen() {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { state: scanState, dispatch } = useScanContext();

  useEffect(() => {
    if (scanState.isScanning) {
      takePicture();
    }
  }, [scanState.isScanning]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ContentText style={styles.message}>
          We need your permission to show the camera
        </ContentText>
        <SwButton onPress={requestPermission} label="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      console.log("pictrue", result);
      dispatch({ type: "TOGGLE_SCANNING", payload: false });

      const uri = result.uri;
      const fileName = uri.split("/").pop() || "photo.jpg";

      // 👇 Tạo blob từ URI
      const response = await fetch(uri);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, fileName); // ✅ Thêm blob kèm tên file

      console.log([...formData]);

      try {
        const res = await fetch("http://192.168.1.5:3000/items/detect", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        console.log("✅ Upload success:", json);
      } catch (err) {
        console.error("❌ Upload failed:", err);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TitleHeader title="Scan Your Clothes" />
      <CameraView style={styles.camera} ref={cameraRef}>
        <Image source={require("../../assets/images/carrier.png")}></Image>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
