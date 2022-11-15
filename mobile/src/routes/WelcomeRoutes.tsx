import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Welcome } from "../screens/Welcome";

const Stack = createNativeStackNavigator()

export function WelcomeRoutes() {
    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name="welcome" component={Welcome} options={{ title: 'Bem vindo!', }} />
        </Stack.Navigator>
    )
}