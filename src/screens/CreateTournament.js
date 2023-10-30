import {
  StyleSheet,
  View,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { useForm } from "react-hook-form";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AppLoader from "../components/AppLoader";
import { db } from "../../firebaseConfig";
import { AppButton, AppTextInput } from "../components";
import { addDoc, collection } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_COLLECTIONS } from "../constants/data";

import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatTimestamp } from "../constants/functions";
import { NAVIGATION } from "../constants/routes";
const CreateTournament = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [startTime, setStartTime] = useState(null);
  const [show, setShow] = useState(false);
  const showStartTimePicker = () => {
    setIsStartTimePickerVisible(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    showStartTimePicker();
    setDate(currentDate);
  };
  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setIsStartTimePickerVisible(false);
    setStartTime(currentDate);
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstTeamName: "",
      secondTeamName: "",
      prizeAmount: "",
      eventName: "",
      eventLocation: "",
      entryFees: "",
    },
  });
  const onSubmit = async (data) => {
    const {
      firstTeamName,
      secondTeamName,
      prizeAmount,
      eventName,
      eventLocation,
      entryFees
    } = data;
    try {
      setloading(true);
      const playersCollectionRef = collection(
        db,
        FIRESTORE_COLLECTIONS.TOURNAMENTS
      );
      await addDoc(playersCollectionRef, {
        firstTeamName,
        secondTeamName,
        prizeAmount,
        eventName,
        eventLocation,
        entryFees,
        date: `${formatDate(date)}`,
        time: `${formatTimestamp(startTime)}`,
      });

      ToastAndroid.show("Tournament Created Successfully", ToastAndroid.SHORT);
      setValue("firstTeamName", "");
      setValue("secondTeamName", "");
      setValue("prizeAmount", "");
      setValue("eventName", "");
      setValue("eventLocation", "");
      setValue("entryFees", "");
      navigation.navigate(NAVIGATION.ADMIN_HOME);
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
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.ADMIN_HOME);
      return () => true;
    },
    []
  );
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
          {"Create Tournament"}
        </AppText>
        <View>
          <AppText style={styles.smallText}>{"First Team name"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"First Team name"}
            name="firstTeamName"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Second Team name"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"Second Team name"}
            name="secondTeamName"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Event name"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"Event name"}
            name="eventName"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Event location"}</AppText>
          <FormInput
            control={control}
            rules={rules}
            placeholder={"Event location"}
            name="eventLocation"
          />
        </View>
        <View>
          <AppText style={styles.smallText}>{"Prize Amount"}</AppText>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
            }}
            placeholder={"Add Prize Amount"}
            name="prizeAmount"
          />
        </View>
        <View style={{ marginBottom: SIZES.base }}>
          <AppText style={styles.smallText}>{"Select Date"}</AppText>
          <TouchableOpacity onPress={() => setShow(true)}>
            <AppTextInput
              editable={false}
              value={`${formatDate(date)} ${formatTimestamp(startTime)}`}
            />
          </TouchableOpacity>
        </View>
        <AppButton title={"Submit"} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode={"date"}
          display="default"
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
      {isStartTimePickerVisible && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
    </View>
  );
};

export default CreateTournament;

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
