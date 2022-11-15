import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { MenuBar } from "../../components/MenuBar";

import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { SYS } from "../../theme";
import { RootStackScreenProps } from "../../@types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { defaultStyles } from "../../theme/styles";
import { Header } from "../../components/Header";
import { PetCardHorizontal } from "../../components/PetCardHorizontal";
import { Loading } from "../../components/Loading";
import { petService } from "../../services/petService";

import Toast from "react-native-toast-message";
import { UserProps } from "../../@types/user";
import Constants from 'expo-constants';
import { usePet } from "../../contexts/Pet";
import ProgressiveImage from "../../components/ProgressiveImage";

export function SolicitationDetail() {
  const navigator = useNavigation<RootStackScreenProps<"solicitationdetail">["navigation"]>();
  const route = useRoute<RootStackScreenProps<"solicitationdetail">["route"]>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pet } = route.params;
  const { favoritedPets } = usePet();

  async function handleAdoption(requestAdoptionUser: UserProps) {
    setIsLoading(true);
    try {
      await petService.confirmPetAdoption(pet._id, requestAdoptionUser._id);
      Toast.show({
        type: "success",
        text1: "Adoção confirmada com sucesso!",
        autoHide: true,
        visibilityTime: 2500,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        autoHide: true,
        visibilityTime: 2500,
      });
    }
    navigator.goBack();
    setIsLoading(false);
  }

  async function handleRejectAdoption(requestAdoptionUser: UserProps) {
    setIsLoading(true);
    try {
      await petService.rejectPetAdoption(pet._id, requestAdoptionUser._id);
      pet.interested_users.filter(
        (user) => user._id !== requestAdoptionUser._id
      );
      Toast.show({
        type: "success",
        text1: "Adoção recusada com sucesso!",
        autoHide: true,
        visibilityTime: 2500,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        autoHide: true,
        visibilityTime: 2500,
      });
    }
    navigator.goBack();
    setIsLoading(false);
  }

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

      <View
        style={[
          defaultStyles.interactionArea,
          { backgroundColor: SYS.COLORS.LIGHTGRAY, marginTop: Constants.statusBarHeight },
        ]}
      >
        {isLoading ? (
          <Loading indicatorStyle={{ color: SYS.COLORS.DARK }} />
        ) : (
          <ScrollView>
            <Text style={styles.dividerText}>Pet Solicitado</Text>
            <View style={styles.divider} />

            <PetCardHorizontal pet={pet} favorited={favoritedPets.includes(pet._id)} />

            {pet.interested_users.map((user, index) => (
                <View key={index}>
                  <Text style={[styles.dividerText, { marginTop: "5%" }]}>
                    Dados do Solicitante {index + 1}
                  </Text>
                  <View style={styles.divider}/>

                  <View style={styles.imageArea}>
                    <ProgressiveImage
                      style={styles.image}
                      source={
                        user.avatar
                          ? { uri: user.avatar }
                          : require("../../../assets/user-silhouette-male.png")
                      }
                    />

                    <Header title={`${user.name}`} colorHex={SYS.COLORS.DARK} />
                  </View>

                  <Text style={styles.fieldTitle}>E-mail</Text>
                  <Text style={styles.fieldDescription}>{user.email}</Text>

                  <Text style={styles.fieldTitle}>Endereço</Text>
                  <Text style={styles.fieldDescription}>
                    {user.address.street}, Nº {user.address.number} -{" "}
                    {user.address.zipCode}, {user.address.city} -{" "}
                    {user.address.federativeUnit}
                  </Text>

                  <Text style={styles.fieldTitle}>Contato</Text>
                  <Text style={styles.fieldDescription}>{user.phone}</Text>

                  <TouchableOpacity
                    style={defaultStyles.finishButton}
                    disabled={isLoading}
                    onPress={() => handleAdoption(user)}
                  >
                    <Text style={defaultStyles.finishButtonText}>
                      Confirmar Adoção
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={defaultStyles.cancelButton}
                    disabled={isLoading}
                    onPress={() => handleRejectAdoption(user)}
                  >
                    <Text style={defaultStyles.finishButtonText}>
                      Recusar Adoção
                    </Text>
                  </TouchableOpacity>
                </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
