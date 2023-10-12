import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native";
import { PLAYERS } from "../constants/data";
import { useEffect, useState } from "react";
import CreateTeamItemComponent from "../components/CreateTeamItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { addGKtoTeam } from "../store/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLoader } from "../components";
const Tab = createMaterialTopTabNavigator();

export default function CreateTeamNavigator() {
  const GK = () => {
    const [playersArray, setplayersArray] = useState([]);
    const addGKtoStorage = async () => {
      console.log("addGKtoStorage");
      try {
        const GK = await AsyncStorage.getItem("GK");
        const parsedGK = GK ? JSON.parse(GK) : null;

        setplayersArray(parsedGK ? parsedGK : PLAYERS.filter((i) => i.isGK));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const addPlayerstoTeamFunc = async (item) => {
      try {
        const da = playersArray.map((i) =>
          i.name === item.name ? { ...i, isActive: !i.isActive } : i
        );
        setplayersArray(da);
        await AsyncStorage.setItem("GK", JSON.stringify(da));
      } catch (error) {
        console.log({ error });
      }
    };
    useEffect(() => {
      addGKtoStorage();
    }, []);
    return (
      <ScrollView>
        {playersArray.map((item, index) => (
          <CreateTeamItemComponent
            key={index}
            item={item}
            addPlayerstoTeamFunc={addPlayerstoTeamFunc}
          />
        ))}
      </ScrollView>
    );
  };
  // const DEF = () => {
  //   const [playersArray, setplayersArray] = useState([]);
  //   const addDEFtoStorage = async () => {
  //     try {
  //       const DEF = await AsyncStorage.getItem("DEF");
  //       setplayersArray(DEF ? JSON.parse(DEF) : PLAYERS.filter((i) => i.isDEF));
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   const addPlayerstoTeamFunc = async (item) => {
  //     try {
  //       const da = playersArray.map((i) =>
  //         i.name === item.name ? { ...i, isActive: !i.isActive } : i
  //       );
  //       setplayersArray(da);
  //       await AsyncStorage.setItem("DEF", JSON.stringify(da));
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };
  //   useEffect(() => {
  //     addDEFtoStorage();
  //   }, []);
  //   return (
  //     <ScrollView>
  //       {playersArray.map((item, index) => (
  //         <CreateTeamItemComponent
  //           key={index}
  //           item={item}
  //           addPlayerstoTeamFunc={addPlayerstoTeamFunc}
  //         />
  //       ))}
  //     </ScrollView>
  //   );
  // };
  // const MID = () => {
  //   const [playersArray, setplayersArray] = useState([]);
  //   const addMIDtoStorage = async () => {
  //     try {
  //       const MID = await AsyncStorage.getItem("MID");
  //       setplayersArray(MID ? JSON.parse(MID) : PLAYERS.filter((i) => i.isMID));
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   const addPlayerstoTeamFunc = async (item) => {
  //     try {
  //       const da = playersArray.map((i) =>
  //         i.name === item.name ? { ...i, isActive: !i.isActive } : i
  //       );
  //       setplayersArray(da);
  //       await AsyncStorage.setItem("MID", JSON.stringify(da));
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };
  //   useEffect(() => {
  //     addMIDtoStorage();
  //   }, []);
  //   return (
  //     <ScrollView>
  //       {playersArray.map((item, index) => (
  //         <CreateTeamItemComponent
  //           key={index}
  //           item={item}
  //           addPlayerstoTeamFunc={addPlayerstoTeamFunc}
  //         />
  //       ))}
  //     </ScrollView>
  //   );
  // };
  // const ST = () => {
  //   const [playersArray, setplayersArray] = useState([]);
  //   const addSTtoStorage = async () => {
  //     try {
  //       const ST = await AsyncStorage.getItem("ST");
  //       setplayersArray(ST ? JSON.parse(ST) : PLAYERS.filter((i) => i.isST));
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   const addPlayerstoTeamFunc = async (item) => {
  //     try {
  //       const da = playersArray.map((i) =>
  //         i.name === item.name ? { ...i, isActive: !i.isActive } : i
  //       );
  //       setplayersArray(da);
  //       await AsyncStorage.setItem("ST", JSON.stringify(da));
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };
  //   useEffect(() => {
  //     addSTtoStorage();
  //   }, []);
  //   return (
  //     <ScrollView>
  //       {playersArray.map((item, index) => (
  //         <CreateTeamItemComponent
  //           key={index}
  //           item={item}
  //           addPlayerstoTeamFunc={addPlayerstoTeamFunc}
  //         />
  //       ))}
  //     </ScrollView>
  //   );
  // };

  return (
    <Tab.Navigator>
      <Tab.Screen name="GK" component={GK} />
      {/* <Tab.Screen name="DEF" component={DEF} />
      <Tab.Screen name="MID" component={MID} />
      <Tab.Screen name="ST" component={ST} /> */}
    </Tab.Navigator>
  );
}
