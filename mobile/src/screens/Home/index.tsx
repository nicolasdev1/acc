import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";

import { Heading } from "../../components/Heading";
import { defaultStyles } from "../../theme/styles";
import { MenuBar } from "../../components/MenuBar";

import { SYS } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Header } from "../../components/Header";
import { DrawerBarScreenProps } from "../../@types/navigation";
import { handleUserAvatar } from "../../utils/avatar";
import { petService } from "../../services/petService";

import Toast from "react-native-toast-message";
import { useAuth } from "../../contexts/Auth";
import { usePet } from "../../contexts/Pet";
import { PetCardHorizontal } from "../../components/PetCardHorizontal";

export function Home() {
  const route = useRoute<DrawerBarScreenProps<"hometab">["route"]>();
  const navigator =
    useNavigation<DrawerBarScreenProps<"hometab">["navigation"]>();

  const [pets, setPets] = useState<any>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);

  const { auther } = useAuth();
  const { favoritedPets } = usePet();

  async function getPetsForAdoption() {
    setIsRefreshing(true);
    try {
      const { pets } = await petService.getPetsForAdoption();
      setPets(pets);
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
    getPetsForAdoption();
  }, []);

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

      <Header title="Adote um amigo!" />

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY },
        ]}
      >
        <Heading
          title="Esperando por você"
          colorHex={SYS.COLORS.DARK}
          style={{ paddingHorizontal: 0, marginBottom: "5%" }}
        />

        <FlatList
          indicatorStyle={"black"}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={getPetsForAdoption} />
          }
          data={pets}
          renderItem={({ item }) => (
            item.owner._id != auther.user._id ?
              <PetCardHorizontal
                pet={item}
                favorited={favoritedPets.includes(item._id)}
              />
            : null
          )}
          keyExtractor={(item) => String(`Item-${item._id}`)}
          ListEmptyComponent={() => (
            <Text>Não há anúncios publicados ainda.</Text>
          )}
        />
      </View>
    </View>
  );
}
