import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import type { RootStackScreenProps } from "../../@types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { styles } from "./styles";
import { defaultStyles } from "../../theme/styles";

import { FloatingInput } from "../../components/Form/FloatingInput";
import { Heading } from "../../components/Heading";

import { Loading } from "../../components/Loading";
import { SYS } from "../../theme";
import { useAuth } from "./../../contexts/Auth";

import Constants from "expo-constants";

type LoginFormData = {
    email: string;
    password: string;
};

export function Login() {
  const route = useRoute<RootStackScreenProps<'login'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'login'>['navigation']>()

  const { signIn } = useAuth()

  const [isValidating, setIsValidating] = useState(false)
  const {control, handleSubmit, formState: {errors} } = useForm<LoginFormData>()

  async function handleLogin(data: LoginFormData) {
      setIsValidating(true)
      await signIn(data.email, data.password)
      setIsValidating(false)
  }

  return (
      <View style={[defaultStyles.background, { paddingTop: Constants.statusBarHeight + 5 }]}>

          <View style={defaultStyles.header}>
              <Heading title='Animal Care Center' subtitle='Acesse a plataforma' />
              <Image style={defaultStyles.headerDog} source={require('../../../assets/login/dog.png')} />
          </View>

          <View style={[defaultStyles.interactionArea, {
              borderTopWidth: 4,
              borderColor: '#683931',
              height: 'auto'
          }]}>

              <Controller
                  control={control}
                  name='email'
                  rules={{
                      required: "Informe o e-mail",
                      pattern: {
                          message: "Informe o e-mail corretamente",
                          value: /^\b[A-Z0-9._%-]+@[A-Z0-9_%-]+\.[A-Z]{2,4}\b$/i 
                      }
                  }}
                  render={({field: {value, onChange}}) => (
                      <FloatingInput label='E-mail' type={'email-address'} value={value} onChange={onChange} errors={errors.email} />
                  )}
              />

              <Controller
                  control={control}
                  name='password'
                  rules={{
                      required: "Informe a senha"
                  }}
                  render={({field: {value, onChange}}) => (
                      <FloatingInput label='Senha' type={'password'} value={value} onChange={onChange} errors={errors.password} secureTextEntry />
                  )}
              />

              <TouchableOpacity style={!isValidating ? styles.loginButton : [styles.loginButton, { backgroundColor: SYS.COLORS.GRAY }]} disabled={isValidating} onPress={handleSubmit(handleLogin)}>
                  <Text style={styles.loginButtonText}>
                      {isValidating ? <Loading /> : <Text>Login</Text>}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerButton} disabled={isValidating} onPress={() => navigation.navigate('register')}>
                  <Text style={styles.registerButtonText}>Cadastre-se</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
}
