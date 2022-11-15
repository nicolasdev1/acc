import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

const Stack = createNativeStackNavigator()

export function AuthRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name='login' component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name='register' component={Register} options={{ title: 'Cadastro' }} />
        </Stack.Navigator>
    )
}