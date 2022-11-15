import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from './../contexts/Auth';
import { Loading } from "../components/Loading";
import { WelcomeRoutes } from "./WelcomeRoutes";
import { SYS } from "../theme";

const Routes = () => {
    const { isLoading, hasSeenWelcomeScreen, auther } = useAuth()

    return (
        isLoading ? <Loading customStyle={{backgroundColor: SYS.COLORS.PRIMARY}} /> :
            <NavigationContainer>
                {!hasSeenWelcomeScreen ? <WelcomeRoutes /> : !auther ? <AuthRoutes /> : <AppRoutes />}
            </NavigationContainer>
    )
}

export default Routes