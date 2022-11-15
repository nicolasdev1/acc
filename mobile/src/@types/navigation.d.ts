import { ViewProps } from "react-native";
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { DrawerScreenProps } from "@react-navigation/drawer";

import { UserProps } from "./user";
import { PetProps } from './pet.d';

export type RootStackParamList = {
    menudrawer: NavigatorScreenParams<DrawerParamList> | undefined;
    profiledrawer: undefined;
    welcome: undefined;
    login?: UserProps;
    register: undefined;
    petdetails: PetDetailsProps;
    ownerdetails: OwnerDetailsProps;
    solicitationdetail: SolicitationDetailProps;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type DrawerParamList = {
    hometab: NavigatorScreenParams<BottomTabParamList> | undefined;
    favoritestab: undefined;
    configurationstab: undefined;
    petform: undefined;
    petlist: undefined;
    solicitations: undefined;
    profile: undefined;
}

export type DrawerBarScreenProps<T extends keyof DrawerParamList> =
    CompositeScreenProps<
        DrawerScreenProps<DrawerParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

export type BottomTabParamList = {
    home: undefined;
    favorites: undefined;
    configurations: undefined;
}

export type HomeTabScreenProps<T extends keyof BottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabParamList, T>,
        DrawerBarScreenProps<keyof DrawerParamList>
    >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export interface PetDetailsProps extends ViewProps {
    pet: PetProps;
    favorited: boolean;
}

export interface PetCardProps extends ViewProps {
    pet: PetProps;
    favorited: boolean;
    path?: string;
}

export interface SolicitationDetailProps {
    pet: PetProps;
}

export interface OwnerDetailsProps {
    owner: UserProps;
}