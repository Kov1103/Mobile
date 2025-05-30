import SwButton from "@/components/shared/SwButton";
import ContentText from "@/components/shared/text/ContentText";
import TitleHeader from "@/components/shared/TitleHeader";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { useScanContext } from "../../service/scan.context";
import api from '@/middleware/auth';
import ScanResultModal from "@/components/ui/ItemDetailModal";
import { uploadImage } from "@/service/item.service";

export default function ScanScreen() {
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { state: scanState, dispatch } = useScanContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

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

  function getItemData(data: any) {
    if (data) {
      const result = {
        image: data.image_uri || '',
        name: 'Item Name',
        category: [data.prediction[0]?.class],
        color: data.dominantColors.slice(0, 3)
      }
      console.log("📦 Item data:", result);
      setResultData(result);
    }
    return null;
  }


  async function takePicture() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();

      dispatch({ type: "TOGGLE_SCANNING", payload: false });

      const uri = result.uri;
      const fileName = uri.split('/').pop() || 'photo.png';

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        name: fileName,
        type: 'image/jpeg',
      } as any);
      try {
        const response = await uploadImage(uri, fileName);

        getItemData(response);
        setModalVisible(true);
      } catch (err) {
        Alert.alert("Error", "Failed to upload image. Please try again.");
        console.error("❌ Upload error:", err);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TitleHeader title="Scan Your Clothes" />
      <CameraView style={styles.camera} ref={cameraRef}>
        <Image source={require('../../assets/images/carrier.png')}></Image>
      </CameraView>
      <ScanResultModal
        visible={modalVisible}
        data={resultData}
        onClose={() => {
          setModalVisible(false);
          setResultData(null);
        }}
      />
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
