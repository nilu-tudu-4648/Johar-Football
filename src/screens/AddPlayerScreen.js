import { StyleSheet, View, ToastAndroid, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { db } from "../../firebaseConfig";
import { AppButton, AppTextInput, SelectPlayerDialog } from "../components";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
import * as ImagePicker from "expo-image-picker";
import { saveMediaToStorage } from "../constants/functions";
import { Avatar } from "react-native-paper";
const AddPlayerScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Type");
  const [image, setimage] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      teamName: "",
      points: "",
    },
  });
  async function getPlayer(name) {
    try {
      const q = query(
        collection(db, FIRESTORE_COLLECTIONS.PLAYERS),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        ToastAndroid.show("Player already exists", ToastAndroid.SHORT);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking player existence:", error);
      ToastAndroid.show("Error checking player existence", ToastAndroid.SHORT);
      return true;
    }
  }
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const urlParts = result.assets[0].uri;
        setimage(urlParts);
        const playerName = getValues("name");
        const url = await saveMediaToStorage(
          urlParts,
          `/players/${playerName}`
        );
        setimage(url);
        ToastAndroid.show("upload successfully", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    const { name, points, teamName } = data;

    try {
      setloading(true);
      const playerExists = await getPlayer(name);
      if (playerExists) {
        return;
      }
      const playersCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.PLAYERS
      );
      await addDoc(playersCollectionRef, {
        name,
        points,
        teamName,
        tournamentName: "IPL",
        playerPic: image,
        isActive: false,
        playerType: selectedOption,
        selectedCaptain: false,
        selectedViceCaptain: false,
      });

      ToastAndroid.show("Player Added Successfully", ToastAndroid.SHORT);
      setValue("name", "");
      setValue("points", "");
      setValue("teamName", "");
      setSelectedOption("Select Type");
      setimage(null);
    } catch (error) {
      console.error("Error adding player:", error);
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };

  const rules = {
    required: "This field is mandatory",
    pattern: {
      value: /^[aA-zZ\s]+$/,
      message: "Only alphabets are allowed for this field.",
    },
  };
  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: SIZES.h1 * 2 }}
      >
        <AppText
          bold={true}
          style={{ alignSelf: "center", marginVertical: SIZES.h3 * 2 }}
          size={2.5}
        >
          {"Add Player"}
        </AppText>
        <TouchableOpacity style={STYLES} onPress={pickImage}>
          {image ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.7}
              source={{ uri: image }}
            />
          ) : (
            <Avatar.Icon
              size={SIZES.largeTitle * 1.7}
              icon="account"
              style={{ backgroundColor: COLORS.gray }}
            />
          )}
        </TouchableOpacity>
        <View>
          <AppText style={styles.smallText}>{"Player name"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"Player name"}
            name="name"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Team name"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"Team name"}
            name="teamName"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Points"}</AppText>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
            }}
            keyboardType={"numeric"}
            placeholder={"Enter points"}
            name="points"
            maxLength={10}
          />
        </View>
        <View style={{ marginBottom: SIZES.base }}>
          <AppText style={styles.smallText}>{"Player Type"}</AppText>
          <TouchableOpacity onPress={() => setvisible(true)}>
            <AppTextInput editable={false} value={selectedOption} />
          </TouchableOpacity>
        </View>
        <AppButton title={"Submit"} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
      <SelectPlayerDialog
        visible={visible}
        setvisible={setvisible}
        setSelectedOption={setSelectedOption}
      />
    </View>
  );
};

export default AddPlayerScreen;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
  },
  container: {
    flex: 1,
    padding: SIZES.h3,
    backgroundColor: COLORS.white,
  },
  smallText: {
    fontSize: SIZES.h6,
    alignSelf: "stretch",
  },
});
