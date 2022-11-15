import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { MenuBar } from "../../components/MenuBar";
import { defaultStyles } from "../../theme/styles";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SYS } from "../../theme";
import { handleUserAvatar } from "../../utils/avatar";
import { Header } from "../../components/Header";
import { DrawerBarScreenProps } from "../../@types/navigation";
import { Heading } from "../../components/Heading";
import { PetCard } from "../../components/PetCard";
import { usePet } from "../../contexts/Pet";
import { petService } from "../../services/petService";

import Toast from "react-native-toast-message";

export function Solicitations() {
  const route = useRoute<DrawerBarScreenProps<"solicitations">["route"]>();
  const navigator =
    useNavigation<DrawerBarScreenProps<"solicitations">["navigation"]>();

  const { favoritedPets } = usePet();
  const [requestedPetVisits, setRequestedPetVisits] = useState<any>();
  const [receivedPetVisits, setReceivedPetVisits] = useState<any>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [requestReload, setRequestReload] = useState<boolean>(false);

  async function getRequestedPetVisits() {
    try {
      const requestedPetVisits = await petService.getRequestedPetVisits();
      setRequestedPetVisits(requestedPetVisits);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  }

  async function getReceivedPetVisits() {
    try {
      const requestedPetVisits = await petService.getReceivedPetVisits();
      setReceivedPetVisits(requestedPetVisits);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  }

  useEffect(() => {
    setIsRefreshing(true);
    getRequestedPetVisits();
    getReceivedPetVisits();
    setIsRefreshing(false);
  }, [requestReload]);

  return (
    <View style={defaultStyles.background}>
      <MenuBar
        left={
          <TouchableOpacity
            onPress={() => navigator.dispatch(DrawerActions.openDrawer)}
          >
            <Ionicons
              name="md-list-circle-sharp"
              color={SYS.COLORS.WHITE}
              size={28}
            />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity onPress={() => navigator.navigate("profile")}>
            {handleUserAvatar()}
          </TouchableOpacity>
        }
      />

      <Header title="Solicitações" />

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => setRequestReload(!requestReload)}/>}>
          <Heading
            title="Recebidas"
            colorHex={SYS.COLORS.DARK}
            style={{ paddingHorizontal: 0, marginBottom: "5%" }}
          />

          <FlatList
            horizontal
            indicatorStyle={"black"}
            showsHorizontalScrollIndicator={false}
            data={receivedPetVisits}
            renderItem={({ item }) => (
              item.interested_users[0] ? 
              <PetCard
                pet={item}
                favorited={favoritedPets.includes(item._id)}
                path={"solicitationdetail"}
              />
              : null
            )}
            keyExtractor={(item) => String(`Item-${item._id}`)}
            ListEmptyComponent={() => (
              <Text>Não há solicitações recebidas ainda. 😿</Text>
            )}
          />

          <Heading
            title="Enviadas"
            colorHex={SYS.COLORS.DARK}
            style={{ paddingHorizontal: 0, marginVertical: "5%" }}
          />

          <FlatList
            horizontal
            indicatorStyle={"black"}
            showsHorizontalScrollIndicator={false}
            data={requestedPetVisits}
            renderItem={({ item }) => (
              <PetCard
                pet={item}
                favorited={favoritedPets.includes(item._id)}
              />
            )}
            keyExtractor={(item) => String(`Item-${item._id}`)}
            ListEmptyComponent={() => (
              <Text>Você ainda não solicitou nenhum pet para adoção.</Text>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}
