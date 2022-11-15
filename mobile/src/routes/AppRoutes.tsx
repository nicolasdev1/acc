import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { SYS } from "../theme";

import { Home } from "../screens/Home";
import { Favorites } from "../screens/Favorites";
import { Configurations } from "../screens/Configurations";
import { PetForm } from "../screens/PetForm";
import { PetList } from "../screens/PetList";
import { PetDetails } from "../screens/PetDetails";
import { Profile } from "../screens/Profile";
import { OwnerDetails } from "../screens/OwnerDetails";
import { Solicitations } from "../screens/Solicitations";
import { SolicitationDetail } from './../screens/SolicitationDetail';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

interface IconProps {
    focused: boolean;
    color: string;
    size: number;
}

export function AppRoutes() {
    return (
        <Stack.Navigator
            initialRouteName='menudrawer'
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                animation: 'slide_from_right'
            })}
        >
            <Stack.Screen name='menudrawer' options={{ title: 'Home' }}>
                {() => <MenuDrawer routeName="hometab" />}
            </Stack.Screen>
            <Stack.Screen name='profiledrawer' options={{ title: 'Profile' }}>
                {() => <MenuDrawer routeName="profile" />}
            </Stack.Screen>
            <Stack.Screen name='petdetails' component={PetDetails} options={{ title: 'Detalhes do Pet' }} />
            <Stack.Screen name='solicitationdetail' component={SolicitationDetail} options={{ title: 'Detalhes da Solicitação' }} />
            <Stack.Screen name='ownerdetails' component={OwnerDetails} options={{ title: 'Proprietário' }} />
        </Stack.Navigator>
    )
}

interface MenuDrawerProps {
    routeName: string;
}

const MenuDrawer = ({ routeName }: MenuDrawerProps) => {
    return (
        <Drawer.Navigator
            initialRouteName={routeName}
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                drawerStatusBarAnimation: 'slide',
                drawerInactiveTintColor: SYS.COLORS.WHITE,
                drawerActiveTintColor: SYS.COLORS.WHITE,
                drawerStyle: {
                    backgroundColor: SYS.COLORS.PRIMARY,
                    borderRightWidth: 4,
                    borderRightColor: SYS.COLORS.WHITE,
                },
                drawerIcon: ({ focused, color, size }: IconProps) => {
                    if (route.name == 'hometab') {
                        return (
                            <Ionicons
                                name={focused ? 'paw-outline' : 'paw'}
                                size={size}
                                color={color}
                            />
                        )
                    } else if (route.name == 'petform') {
                        return (
                            <Entypo
                                name={'add-to-list'}
                                size={size}
                                color={color}
                            />
                        )
                    } else if (route.name == 'petlist') {
                        return (
                            <FontAwesome5
                                name={'list-ul'}
                                size={size}
                                color={color}
                            />
                        )
                    } else if (route.name == 'favoritestab') {
                        return (
                            <Entypo
                                name={focused ? 'heart-outlined' : 'heart'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name == 'solicitations') {
                        return (
                            <Ionicons
                                name={focused ? 'mail-outline' : 'mail-sharp'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name == 'profile') {
                        return (
                            <Ionicons
                                name={focused ? 'person-outline' : 'person'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name == 'configurationstab') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-settings-outline' : 'ios-settings'}
                                size={size}
                                color={color}
                            />
                        );
                    } else {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'star-settings-outline' : 'star-settings'}
                                size={size}
                                color={color}
                            />
                        )
                    }
                }
            })}
        >
            <Drawer.Screen name='hometab' options={{ title: 'Adoções' }} >
                {() => <HomeTab routeName='home' />}
            </Drawer.Screen>
            <Drawer.Screen name='petform' component={PetForm} options={{ title: 'Adicionar Pet' }} />
            <Drawer.Screen name='petlist' component={PetList} options={{ title: 'Meus Pets' }} />
            <Drawer.Screen name='favoritestab' options={{ title: 'Favoritos' }} >
                {() => <HomeTab routeName='favorites' />}
            </Drawer.Screen>
            <Drawer.Screen name='solicitations' component={Solicitations} options={{ title: 'Solicitações' }} />
            <Drawer.Screen name='profile' component={Profile} options={{ title: 'Perfil' }} />
            <Drawer.Screen name='configurationstab' options={{ title: 'Configurações' }} >
                {() => <HomeTab routeName='configurations' />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

interface HomeTabProps {
    routeName: string
}

const HomeTab = ({ routeName }: HomeTabProps) => {
    return (
        <BottomTab.Navigator
            initialRouteName={routeName}
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarInactiveTintColor: SYS.COLORS.WHITE,
                tabBarActiveTintColor: SYS.COLORS.WHITE,
                tabBarStyle: {
                    backgroundColor: SYS.COLORS.PRIMARY,
                },
                tabBarIcon: ({ focused, color, size }: IconProps) => {
                    if (route.name == 'home') {
                        return (
                            <Ionicons
                                name={focused ? 'paw' : 'paw-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name == 'configurations') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-settings' : 'ios-settings-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name == 'favorites') {
                        return (
                            <MaterialIcons
                                name={focused ? 'favorite' : 'favorite-outline'}
                                size={size}
                                color={color}
                            />
                        )
                    }
                },
            })}
        >
            <BottomTab.Screen name='home' component={Home} options={{ title: 'Home' }} />
            <BottomTab.Screen name='favorites' component={Favorites} options={{ title: 'Favoritos' }} />
            <BottomTab.Screen name='configurations' component={Configurations} options={{ title: 'Configurações' }} />
        </BottomTab.Navigator>
    )
}