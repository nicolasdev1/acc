import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { defaultStyles } from "../../theme/styles";
import { styles } from "./styles";
import { SYS } from "../../theme";

import { MenuBar } from "../../components/MenuBar";
import { DrawerBarScreenProps } from "../../@types/navigation";
import { Header } from "../../components/Header";
import { PetCardHorizontal } from "../../components/PetCardHorizontal";

import { petService } from "../../services/petService";
import Toast from "react-native-toast-message";
import { usePet } from "../../contexts/Pet";

export function PetList() {
  const route = useRoute<DrawerBarScreenProps<"configurationstab">["route"]>();
  const navigator =
    useNavigation<DrawerBarScreenProps<"configurationstab">["navigation"]>();

  const [myPets, setMyPets] = useState<any>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const { favoritedPets } = usePet();

  async function getMyPets() {
    setIsRefreshing(true);
    try {
      const { pets } = await petService.getMyPets();
      setMyPets(pets);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        autoHide: true,
        visibilityTime: 2500,
      });
    }
    setIsRefreshing(false);
  }

  useEffect(() => {
    getMyPets();
  }, []);

  return (
    <View style={defaultStyles.background}>
      <MenuBar
        left={
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Entypo
              name="chevron-with-circle-left"
              color={SYS.COLORS.WHITE}
              size={28}
            />
          </TouchableOpacity>
        }
        right={null}
      />

      <Header title="Meus Pets" />

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY },
        ]}
      >
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={getMyPets} />
          }
          indicatorStyle={"black"}
          data={myPets}
          renderItem={({ item }) => (
            <PetCardHorizontal
              pet={item}
              favorited={favoritedPets.includes(item._id)}
            />
          )}
          keyExtractor={(item) => String(`Item-${item._id}`)}
          ListEmptyComponent={() => (
            <Text>Você ainda não possui pets cadastrados.</Text>
          )}
        />

        <TouchableOpacity
          style={defaultStyles.finishButton}
          onPress={() => navigator.navigate("petform")}
        >
          <Text style={defaultStyles.finishButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
