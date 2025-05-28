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
      console.log(result);
      dispatch({ type: "TOGGLE_SCANNING", payload: false });

      const uri = result.uri;
      const fileName = uri.split("/").pop();
      const fileType = "image/jpeg";

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: fileName,
        type: fileType,
      } as any);

      console.log(fileType);
      try {
        const res = await fetch("http://localhost:3000/items/detect", {
          method: "POST",
          body: formData,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
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
