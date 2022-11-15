import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";

import { MenuBar } from "../../components/MenuBar";

import { styles } from "./styles";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { SYS } from "../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackScreenProps } from "../../@types/navigation";
import { defaultStyles } from "../../theme/styles";
import { Header } from "../../components/Header";

import { pets } from "../../static/pets";
import { PetCard } from "../../components/PetCard";
import { petService } from "../../services/petService";

import Toast from 'react-native-toast-message'
import { usePet } from "../../contexts/Pet";
import ProgressiveImage from "../../components/ProgressiveImage";

export function OwnerDetails() {
  const navigator = useNavigation<RootStackScreenProps<"ownerdetails">["navigation"]>();
  const route = useRoute<RootStackScreenProps<"ownerdetails">["route"]>();

  const { owner } = route.params;
  const { street, number, city, zipCode, federativeUnit } = owner.address;
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [ownerPets, setOwnerPets] = useState<any>();

  const { favoritedPets } = usePet()
  
  async function getPetsByOwner() {
    setIsRefreshing(true);
    try {
      const { pets } = await petService.getPetsByOwner(owner._id);
      setOwnerPets(pets);
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
    getPetsByOwner();
  }, [favoritedPets]);

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

      <View style={styles.imageArea}>
        <ProgressiveImage
          source={
            owner.avatar
              ? { uri: owner.avatar }
              : require("../../../assets/user-silhouette-male.png")
          }
          style={styles.image}
        />

        <Header title={`${owner.name}`} />
      </View>

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY },
        ]}
      >
        <ScrollView>
          <Text style={styles.dividerText}>Sobre</Text>
          <View style={styles.divider} />

          <Text style={styles.text}>
            <Ionicons
              size={20}
              color={SYS.COLORS.PRIMARY}
              name="location-sharp"
            />{" "}
            {street}, Nº {number} - {zipCode}, {city} - {federativeUnit}
          </Text>

          <Text style={styles.text}>
            <MaterialCommunityIcons
              size={20}
              color={SYS.COLORS.PRIMARY}
              name="email"
            />{" "}
            {owner.email}
          </Text>

          <Text style={styles.text}>
            <FontAwesome size={20} color={SYS.COLORS.PRIMARY} name="phone" />{" "}
            {owner.phone}
          </Text>

          <Text style={styles.dividerText}>Pets</Text>
          <View style={styles.divider} />

          <FlatList
            horizontal
            indicatorStyle={"black"}
            showsHorizontalScrollIndicator={false}
            data={ownerPets}
            renderItem={({ item }) => (
              <PetCard pet={item} favorited={favoritedPets.includes(item._id)} />
            )}
            keyExtractor={(item) => String(`Item-${item._id}`)}
            ListEmptyComponent={() => (
              <Text>Este usuário ainda não possui pets cadastrados.</Text>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}
