import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";

import { defaultStyles } from "../../theme/styles";
import { SYS } from "../../theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { Header } from "../../components/Header";
import { MenuBar } from "../../components/MenuBar";
import { PetCardHorizontal } from "../../components/PetCardHorizontal";
import { DrawerBarScreenProps } from "../../@types/navigation";
import { useAuth } from "./../../contexts/Auth";
import { handleUserAvatar } from "../../utils/avatar";
import { usePet } from "../../contexts/Pet";
import { petService } from "../../services/petService";
import Toast from "react-native-toast-message";

export function Favorites() {
  const route = useRoute<DrawerBarScreenProps<"favoritestab">["route"]>();
  const navigator =
    useNavigation<DrawerBarScreenProps<"favoritestab">["navigation"]>();

  const [pets, setPets] = useState<any>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const { favoritedPets } = usePet();

  async function getFavoritedPets() {
    setIsRefreshing(true);
    try {
      const { pets } = await petService.getAllPets();
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
    getFavoritedPets();
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

      <Header title="Favoritos" />

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY },
        ]}
      >
        <FlatList
          indicatorStyle={"black"}
          data={pets}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getFavoritedPets}
            />
          }
          renderItem={({ item }) =>
            favoritedPets.includes(item._id) ? (
              <PetCardHorizontal pet={item} favorited={true} />
            ) : null
          }
          keyExtractor={(item) => String(`Item-${item._id}`)}
          ListEmptyComponent={() => (
            <Text>Não há anúncios publicados ainda.</Text>
          )}
        />
      </View>
    </View>
  );
}
